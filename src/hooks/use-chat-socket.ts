import { useSocket } from '@/providers/socket-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ChatSocketProps = {
  event: string;
};

export const useChatSocket = ({ event }: ChatSocketProps) => {
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.on(event, () => {
      console.log('Socket event received');
      router.refresh();
    });

    return () => {
      socket.off(event);
    };
  }, [event, router, socket]);
};
