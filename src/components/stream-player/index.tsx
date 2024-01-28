'use client';

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  VideoConference,
} from '@livekit/components-react';

import { Stream, User } from '@/db/types';
import { useViewerToken } from '@/hooks/use-viewer-token';
import { Chat } from '../chat';
import { Video } from './video';

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

  if (!viewerToken || !identity || !name) {
    return <div></div>;
  }

  return (
    <>
      <LiveKitRoom
        video={true}
        audio={true}
        token={viewerToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className='grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-y-0 
        xl:grid-cols-4 2xl:grid-cols-6'
      >
        <div
          className='no-scrollbar col-span-1 pb-10 
          lg:col-span-2 lg:overflow-y-hidden xl:col-span-3 2xl:col-span-5'
        >
          <Video hostName={user.username} hostId={user.id} />
        </div>
        <Chat />
      </LiveKitRoom>
    </>
  );
};
