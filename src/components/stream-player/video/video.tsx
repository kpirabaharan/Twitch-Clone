import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';

import { LiveVideo } from '@/components/stream-player/video/live-video';
import { LoadingVideo } from '@/components/stream-player/video/loading-video';
import { OfflineVideo } from '@/components/stream-player/video/offline-video';
import { Skeleton } from '@/components/ui/skeleton';

interface VideoProps {
  hostName: string;
  hostId: string;
}

export const Video = ({ hostName, hostId }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter(track => track.participant.identity === hostId);

  var content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo hostName={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return (
    <div
      className='group relative aspect-video shrink border-b 
      border-background lg:max-h-[calc(100vh-56px)]'
    >
      {content}
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className='aspect-video shrink border-b border-background'>
      <Skeleton className='h-full w-full rounded-none' />
    </div>
  );
};
