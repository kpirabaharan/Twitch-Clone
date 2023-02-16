'use client';

import { LiveKitRoom } from '@livekit/components-react';
import { Variants } from 'framer-motion';

import { ChatMessage, Stream, User } from '@/db/types';
import { useViewerToken } from '@/hooks/use-viewer-token';
import { useChatSidebar } from '@/store/use-chat-sidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { Chat, ChatSkeleton } from '@/components/stream-player/chat';
import { ChatToggle } from '@/components/stream-player/chat/chat-toggle';
import { StreamHeader } from '@/components/stream-player/header/stream-header';
import { Video, VideoSkeleton } from '@/components/stream-player/video/video';

interface StreamPlayerProps {
  user: User;
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { identity, name, viewerToken } = useViewerToken(user.id);
  const { isExpanded } = useChatSidebar();

  const variants: Variants = {
    show: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    hide: {
      x: 100,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (!viewerToken || !identity || !name) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      <MotionDiv
        className='absolute right-4 top-4 z-50 hidden lg:block'
        initial='hide'
        animate={!isExpanded ? 'show' : 'hide'}
        exit={!isExpanded ? 'show' : 'hide'}
        variants={variants}
      >
        <ChatToggle />
      </MotionDiv>
      <LiveKitRoom
        token={viewerToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className='flex h-full w-full flex-col lg:flex-row'
      >
        <div className='w-full'>
          <Video hostName={user.username} hostId={user.id} />
          <StreamHeader />
        </div>
        <Chat
          viewerName={name}
          streamId={stream.id}
          hostId={user.id}
          hostName={user.username}
          isFollowing={isFollowing}
          isChatEnabled={stream.isChatEnabled}
          isChatDelayed={stream.isChatDelayed}
          isChatFollowersOnly={stream.isChatFollowersOnly}
        />
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className='flex h-full w-full flex-col lg:flex-row'>
      <div className='w-full'>
        <VideoSkeleton />
      </div>
      <ChatSkeleton />
    </div>
  );
};
