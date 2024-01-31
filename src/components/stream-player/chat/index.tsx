'use client';

import {
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { Variants } from 'framer-motion';
import { ConnectionState } from 'livekit-client';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { ChatMessage } from '@/db/types';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import {
  ChatHeader,
  ChatHeaderSkeleton,
} from '@/components/stream-player/chat/chat-header';
import {
  ChatInput,
  ChatInputSkeleton,
} from '@/components/stream-player/chat/chat-input';
import {
  ChatList,
  ChatListSkeleton,
} from '@/components/stream-player/chat/chat-list';
import { CommunityList } from '@/components/stream-player/chat/community-list';

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostId: string;
  streamId: string;
  messages: ChatMessage[];
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  messages,
  hostId,
  streamId,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery('(min-width: 1024px)');

  // Manage Sidebar State and Variant
  const { variant, isExpanded, onExpand, onCollapse } = useChatSidebar();

  // Check if Stream is Online and Connected
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  useEffect(() => {
    onExpand();
  }, [matches, onExpand, onCollapse]);

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
      initial={'open'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={variants}
    >
      <ChatHeader />
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList
            messages={messages}
            isOffline={!isOnline}
            isChatDisabled={!isChatEnabled}
          />
          <ChatInput
            viewerName={viewerName}
            streamId={streamId}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <>
          <CommunityList
            hostName={hostName}
            viewerName={viewerName}
            isHidden={isHidden}
          />
        </>
      )}
    </MotionDiv>
  );
};

export const ChatSkeleton = () => {
  return (
    <div
      className='flex h-full max-h-[500px] w-full shrink-0 flex-col overflow-x-hidden 
      border-b border-l pt-0 lg:h-[calc(100vh-56px)] lg:max-h-full lg:w-[300px]'
    >
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatInputSkeleton />
    </div>
  );
};
