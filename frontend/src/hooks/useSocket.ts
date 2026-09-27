import { useCallback, useEffect, useState } from 'react';
import { disconnectSocket, getSocket } from '@shared/socket';
import { getToken } from '@shared/http';

export const useSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let mounted = true;
    let socketInstance: Awaited<ReturnType<typeof getSocket>> | null = null;

    getSocket().then(async (socket) => {
      if (!mounted) return;
      socketInstance = socket;
      setConnected(socket.connected);

      const onConnect = () => setConnected(true);
      const onDisconnect = () => setConnected(false);

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);

      const token = await getToken();
      if (token) {
        socket.auth = { token };
        if (!socket.connected) {
          socket.connect();
        }
      }
    });

    return () => {
      mounted = false;
      socketInstance?.off('connect');
      socketInstance?.off('disconnect');
    };
  }, []);

  const emit = useCallback((event: string, payload?: unknown) => {
    getSocket().then((socket) => {
      socket.emit(event, payload);
    });
  }, []);

  const on = useCallback((event: string, handler: (...args: any[]) => void) => {
    let active = true;
    let socketInstance: Awaited<ReturnType<typeof getSocket>> | null = null;

    getSocket().then((socket) => {
      if (!active) return;
      socketInstance = socket;
      socket.on(event, handler);
    });

    return () => {
      active = false;
      socketInstance?.off(event, handler);
    };
  }, []);

  return {
    connected,
    emit,
    on,
    disconnect: disconnectSocket,
  };
};

export default useSocket;
