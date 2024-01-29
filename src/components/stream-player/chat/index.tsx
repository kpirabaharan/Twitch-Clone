'use client';

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { Variants } from 'framer-motion';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { ChatHeader } from '@/components/stream-player/chat/chat-header';
import { ChatInput } from '@/components/stream-player/chat/chat-input';
import { ChatList } from '@/components/stream-player/chat/chat-list';
import { CommunityForm } from '@/components/stream-player/chat/community-form';

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostId: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostId,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery('(min-width: 1024px)');
  const { variant, isExpanded, onExpand, onCollapse } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  // Chat Input
  const [value, setValue] = useState('');
  const { chatMessages: messages, send, isSending } = useChat();

  useEffect(() => {
    onExpand();
  }, [matches, onExpand, onCollapse]);

  const reveresedMessages = useMemo(
    () => messages.sort((a, b) => b.timestamp - a.timestamp),
    [messages],
  );

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (value: string) => setValue(value);

  const variants: Variants = {
    open: {
      width: matches ? 300 : '100%',
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      width: '0%',
      x: 300,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <MotionDiv
      className='flex h-full max-h-[500px] shrink-0 flex-col overflow-x-hidden 
      border-b border-l bg-card pt-0 lg:h-[calc(100vh-56px)] lg:max-h-full'
      initial={'closed'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={variants}
    >
      <ChatHeader />
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList
            messages={reveresedMessages}
            isOffline={!isOnline}
            isChatDisabled={!isChatEnabled}
          />
          <ChatInput
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <>
          <CommunityForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
    </MotionDiv>
  );
};
