import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { CommonInputRef } from '../../../shared/СommonInput';
import { useModal } from '../../../utils/useModal';
import { closeSocket, getSocket } from '../../../services/ws';
import {
  lobbyClear,
  lobbyInit,
  lobbyUpdate,
  lobbyUpdateState,
} from '../../../redux/store/lobby';
import { receiptTypes } from '../../../constants/enums/billEnums';
import { ShareLinkModalBody } from '../ui/ShareLinkModalBosy';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { makePayment } from '../../../redux/store/lobby/lobbyThunks';
import { unsetIsConfigured } from '../../../redux/store/bill';

export const useLobbyPage = () => {
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
    const lastUserId = localStorage.getItem('userId') || '';
    const socket = getSocket(receiptId || restUrl, lastUserId);
    socketRef.current = socket;

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
      if (document.visibilityState === 'visible') {
        const socket = getSocket(receiptId || restUrl, lastUserId);
        socket.onmessage = messageHandler;
        socketRef.current = socket;
      }
    };

    document.addEventListener('visibilitychange', reconnectHandler);

    socket.onmessage = messageHandler;

    return () => {
      if (!isIniciator) {
        document.removeEventListener('visibilitychange', reconnectHandler);
        closeSocket();
      }
    };
  }, []);

  useEffect(() => {
    if (tipsPercent || tipsAmount || tipsType === receiptTypes.NONE) {
      setIsValid(true);
    }
  }, [tipsPercent, tipsAmount, tipsType]);

  const getIsValid = useCallback(() => {
    if (!tipsRef.current) {
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

  const backClickHandler = () => {
    dispatch(unsetIsConfigured());
    dispatch(lobbyClear());
  };

  const shareLinkHandler = () => {
    showModal(shareLinkModalConfig);
  };

  return {
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
    backClickHandler,
    paymentHandler,
    shareLinkHandler,
    pickHandler,
    getIsValid,
    isValid,
    isConfigured,
    finalUserAmount,
    finalUserTips,
    setIsValid,
    tipsRef,
  };
};
