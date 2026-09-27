import { io, Socket } from 'socket.io-client';
import { API_URL } from '@shared/constants';
import { getToken } from '@shared/http';

let socket: Socket | null = null;

export const getSocket = async (): Promise<Socket> => {
  const token = await getToken();
  const baseUrl = API_URL.replace(/\/$/, '');

  if (socket) {
    socket.auth = { token };
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }

  socket = io(baseUrl, {
    auth: { token },
    transports: ['websocket', 'polling'],
    autoConnect: true,
  });

  return socket;
};

export const reconnectSocketWithAuth = async () => {
  const token = await getToken();
  if (!socket) {
    return getSocket();
  }
  socket.auth = { token };
  socket.disconnect();
  socket.connect();
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
