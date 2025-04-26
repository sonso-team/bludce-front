import { WS_URL } from '../../constants/endpoints/endpointConst';

let socket: WebSocket | null = null;

export const getSocket = (rest: string): WebSocket => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(`${WS_URL}/ws/lobby/${rest}`);
  }
  return socket;
};

export const closeSocket = (): void => {
  socket?.close();
  socket = null;
};
