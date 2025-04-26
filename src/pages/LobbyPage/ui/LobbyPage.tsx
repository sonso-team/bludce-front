import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './lobby-page.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { unsetIsConfigured } from '../../../redux/store/bill';
import { Header } from '../../../components/header';
import { Button } from '../../../shared/Button';
import { BillList } from '../../../widgets/BillList';
import { Heading } from '../../../shared/Heading';
import { useModal } from '../../../utils/useModal';
import Loader from '../../../components/Loader';
import { WS_URL } from '../../../constants/endpoints/endpointConst';
import {
  lobbyClear,
  lobbyInit,
  lobbyUpdate,
  lobbyUpdateState,
} from '../../../redux/store/lobby';
import { receiptTypes } from '../../../constants/enums/billEnums';
import { PaymentInfoWidget } from '../../../widgets/PaymentInfoWidget';
import type { CommonInputRef } from '../../../shared/СommonInput';
import { Paragraph } from '../../../shared/Paragraph';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { makePayment } from '../../../redux/store/lobby/lobbyThunks';
import { ShareLinkModalBody } from './ShareLinkModalBosy';

export const LobbyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isConfigured, receiptId } = useAppSelector(
    (state) => state.billsReducer,
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const tipsRef = useRef<CommonInputRef>(null);
  const {
    isLoading,
    state,
    isIniciator,
    userId,
    fullAmount,
    tipsType,
    receiptType,
    tipsAmount,
    tipsPercent,
    userAmount,
    isPayed,
  } = useAppSelector((state) => state.lobbyReducer);

  const { showModal } = useModal();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const restUrl = window.location.pathname.split('/').pop();
    const lastUserId = localStorage.getItem('userId');
    let socket = new WebSocket(
      `${WS_URL}/ws/lobby/${receiptId || restUrl}/${lastUserId || ''}`,
    );

    const messageHandler = (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'INIT':
          dispatch(lobbyInit(data));
          break;
        case 'UPDATE':
          dispatch(lobbyUpdate(data));
          break;
      }
    };

    const reconnectHandler = () => {
      if (
        document.visibilityState === 'visible' &&
        (socket.readyState === socket.CLOSED ||
          socket.readyState === socket.CLOSING)
      ) {
        socket = new WebSocket(
          `${WS_URL}/ws/lobby/${receiptId || restUrl}/${lastUserId || ''}`,
        );
        socket.onmessage = messageHandler;
      }
    };

    document.addEventListener('visibilitychange', reconnectHandler);

    socketRef.current = socket;

    socket.onmessage = messageHandler;

    return () => {
      if (!isIniciator) {
        socket.close();
        document.removeEventListener('visibilitychange', reconnectHandler);
      }
    };
  }, []);

  useEffect(() => {
    if (
      tipsPercent ||
      tipsAmount ||
      tipsType === receiptTypes.NONE ||
      tipsType === receiptTypes.FOR_KICKS
    ) {
      setIsValid(true);
    }
  }, [tipsPercent, tipsAmount, tipsType]);

  const getIsValid = useCallback(() => {
    if (
      !tipsRef.current ||
      tipsType === receiptTypes.NONE ||
      tipsType === receiptTypes.FOR_KICKS
    ) {
      return true;
    }
    return !tipsRef.current?.isError && tipsRef.current.isDirty;
  }, []);

  const shareLinkModalConfig = {
    overrideContent: <ShareLinkModalBody receiptId={receiptId} />,
  };

  const paymentHandler = () => {
    dispatch(showLocalLoader());
    dispatch(
      makePayment({
        userId,
        receiptId: receiptId || window.location.pathname.split('/').pop(),
        tips: finalUserTips || tipsAmount || 0,
      }),
    ).then(() => {
      dispatch(hideLocalLoader());
    });
  };

  const pickHandler = (item, index) => {
    if ((item.userId && item.userId !== userId) || item.paidBy) {
      return;
    }
    const data = Array.from(state);
    const newItem = { ...item };

    if (item.userId === userId) {
      newItem.userId = null;
    } else {
      newItem.userId = userId;
    }
    data[index] = newItem;
    dispatch(lobbyUpdateState(data));

    // ToDo Не знаю будет ли работать без таймаута, пробовать боюсь
    setTimeout(() => {
      socketRef.current.send(JSON.stringify(data));
    }, 0);
  };

  const finalUserAmount = useMemo(() => {
    return state.reduce((acc, item) => {
      return item.userId === userId ? acc + item.price : acc;
    }, 0);
  }, [state]);

  const finalUserTips = useMemo(() => {
    return (finalUserAmount * tipsPercent) / 100;
  }, [finalUserAmount]);

  useEffect(() => {
    if (isPayed) {
      navigate('/final');
    }
  }, [isPayed]);

  if (!isConfigured && isIniciator) {
    return <Navigate to="/home" />;
  }

  if (isLoading) {
    return <Loader type="global" />;
  }

  return (
    <div className="LobbyPage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="ЧЕК"
        withBackButton={true}
        onBackButtonClick={() => {
          dispatch(unsetIsConfigured());
          dispatch(lobbyClear());
        }}
      />
      <div className="LobbyPage__content">
        {receiptType === receiptTypes.PROPORTIONALLY ? (
          <>
            <Heading
              level={5}
              className="LobbyPage__description"
            >
              Выберите позиции в чеке:
            </Heading>
            <BillList
              billItems={state}
              isLiveTime
              onPick={pickHandler}
              myId={userId}
            />
            <div className="LobbyPage__finalAmounts">
              <div className="LobbyPage__finalTipsAmount">
                <Paragraph level={4}>Чаевые:</Paragraph>
                <Paragraph level={4}>
                  {tipsAmount ? tipsAmount.toFixed(2) : finalUserTips}р.
                </Paragraph>
              </div>
              <div className="LobbyPage__finalAmmount">
                <Heading level={5}>Итого:</Heading>
                <Heading level={5}>
                  {`${finalUserAmount + Number(tipsAmount ? tipsAmount.toFixed(2) : finalUserTips)}р.`}
                </Heading>
              </div>
            </div>
          </>
        ) : (
          <PaymentInfoWidget
            finalAmount={fullAmount}
            personAmount={Number(userAmount.toFixed(2))}
            withoutTips={tipsType === receiptTypes.NONE}
            tipsAmount={
              tipsType === receiptTypes.EVENLY
                ? Number(tipsAmount.toFixed(2))
                : Number(((userAmount * tipsPercent) / 100).toFixed(2))
            }
            onChange={() => setIsValid(getIsValid())}
            ref={tipsRef}
          />
        )}
      </div>
      <div className="LobbyPage__buttons">
        {isIniciator ? (
          <>
            <Button
              className="LobbyPage__nextBtn"
              onClick={paymentHandler}
              disabled={!isValid}
              style="secondary"
            >
              Сохранить
            </Button>
            <Button
              className="LobbyPage__nextBtn"
              onClick={() => showModal(shareLinkModalConfig)}
            >
              Поделиться ссылкой
            </Button>
          </>
        ) : (
          <Button
            onClick={paymentHandler}
            className="LobbyPage__payBtn"
            color="green"
            disabled={!isValid}
          >
            Оплатить
          </Button>
        )}
      </div>
    </div>
  );
};

export default LobbyPage;
