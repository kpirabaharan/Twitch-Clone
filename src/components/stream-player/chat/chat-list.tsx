'use client';

import { Fragment, useEffect, useRef } from 'react';
import { SyncLoader } from 'react-spinners';
import { useIntersectionObserver } from 'usehooks-ts';

import { ChatMessage } from '@/db/types';
import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatSocket } from '@/hooks/use-chat-socket';

import { ChatItem } from '@/components/stream-player/chat/chat-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatListProps {
  streamId: string;
  isOffline: boolean;
  isChatDisabled: boolean;
}

export const ChatList = ({
  streamId,
  isOffline,
  isChatDisabled,
}: ChatListProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useIntersectionObserver(divRef, { threshold: 0.5 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      apiUrl: '/api/stream-messages',
      streamId,
    });

  const addKey = `stream-${streamId}`;
  useChatSocket({ addKey, queryKey: streamId });

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [ref, fetchNextPage, hasNextPage]);

  let message;
  switch (true) {
    case isChatDisabled:
      message = 'Chat is disabled';
      break;
    case isOffline:
      message = 'Stream is offline';
      break;
    case status === 'success' && !data?.pages[0]?.items.length:
      message = 'Welcome to the chat!';
      break;
  }

  if (message) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-muted-foreground'>{message}</p>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className='flex flex-1 flex-col items-center justify-center'>
        <SyncLoader color={'#4F46E5'} />
      </div>
    );
  }

  if (status === 'error') {
    <div className='flex flex-1 flex-col justify-center text-center'>
      Something went wrong!
    </div>;
  }

  return (
    <ScrollArea className='flex-1 p-2'>
      {isFetchingNextPage && <SyncLoader color={'#4F46E5'} />}
      {hasNextPage && <div ref={divRef} />}
      <div className='flex flex-col-reverse'>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: ChatMessage, index: number) => (
              <ChatItem key={index} data={message} />
            ))}
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className='mx-2 my-4 flex h-full flex-1 items-center justify-center'>
      <Skeleton className='h-full w-full rounded-lg' />
    </div>
  );
};
