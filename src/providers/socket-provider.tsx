'use client';

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io as ClientIO } from 'socket.io-client';

type SocketContextType = { socket: any | null; isConnected: boolean };

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps extends PropsWithChildren {}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // CREATE SOCKET INSTANCE
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });

    // CONNECT TO SOCKET
    socketInstance.on('connect', () => {
      console.log('Connected to Socket');
      setIsConnected(true);
    });

    // DISCONNECT FROM SOCKET
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket');
      setIsConnected(false);
    });

    // SET SOCKET
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
