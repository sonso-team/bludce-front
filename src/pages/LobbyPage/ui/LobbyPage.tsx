import React, { useEffect, useMemo, useRef } from 'react';
import './lobby-page.scss';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { unsetIsConfigured } from '../../../redux/store/bill';
import { Header } from '../../../components/header';
import { Button } from '../../../shared/Button';
import { BillList } from '../../../widgets/BillList';
import { Heading } from '../../../shared/Heading';
import { useModal } from '../../../utils/useModal';
import Loader from '../../../components/Loader';
import { API_URL, WS_URL } from '../../../constants/endpoints/endpointConst';
import {
  lobbyInit,
  lobbyUpdate,
  lobbyUpdateState,
} from '../../../redux/store/lobby';
import { ShareLinkModalBody } from './ShareLinkModalBosy';

export const LobbyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { billsData, isConfigured, receiptId } = useAppSelector(
    (state) => state.billsReducer,
  );
  const { isLoading, isConnected, state, isIniciator, userId } = useAppSelector(
    (state) => state.lobbyReducer,
  );
  const { showModal } = useModal();

  const socketRef = useRef<WebSocket | null>(null);

  const shareLinkModalConfig = {
    overrideContent: <ShareLinkModalBody receiptId={receiptId} />,
  };

  useEffect(() => {
    const restUrl = window.location.pathname.split('/').pop();
    const socket = new WebSocket(`${WS_URL}/ws/lobby/${receiptId || restUrl}`);
    socketRef.current = socket;

    socket.onmessage = (message: MessageEvent) => {
      console.log('message', JSON.parse(message.data));
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

    socket.onclose = () => {
      console.log('close');
    };

    socket.onopen = () => {
      console.log('Успешно подключено');
    };
    return () => socket.close();
  }, []);

  const pickHandler = (item, index) => {
    if (item.userId && item.userId !== userId) {
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
    setTimeout(() => {
      socketRef.current.send(JSON.stringify(data));
    }, 0);
  };

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
        onBackButtonClick={() => dispatch(unsetIsConfigured())}
      />
      <div className="LobbyPage__content">
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
      </div>
      <div className="LobbyPage__buttons">
        {isIniciator ? (
          <>
            <Button
              className="LobbyPage__nextBtn"
              onClick={() => 1}
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
            onClick={() => 1}
            className="LobbyPage__payBtn"
          >
            Оплатить
          </Button>
        )}
      </div>
    </div>
  );
};

export default LobbyPage;
