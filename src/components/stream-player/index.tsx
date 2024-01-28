'use client';

import { LiveKitRoom } from '@livekit/components-react';

import { Stream, User } from '@/db/types';
import { useViewerToken } from '@/hooks/use-viewer-token';
import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';

import { Chat } from '@/components/stream-player/chat';
import { Video } from '@/components/stream-player/video/video';

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

  if (!viewerToken || !identity || !name) {
    return <div></div>;
  }

  return (
    <>
      <LiveKitRoom
        token={viewerToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'flex h-full w-full flex-col gap-y-0 overflow-y-clip lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
          !isExpanded && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className='lg:col-span-2 xl:col-span-3 2xl:col-span-4'>
          <Video hostName={user.username} hostId={user.id} />
        </div>
        <div className={cn('col-span-1 h-full', !isExpanded && 'hidden')}>
          <Chat
            hostId={user.id}
            hostName={user.username}
            viewerName={name}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
