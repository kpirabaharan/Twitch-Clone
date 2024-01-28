import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';

import { LiveVideo } from './live-video';
import { LoadingVideo } from './loading-video';
import { OfflineVideo } from './offline-video';

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
    <div className='group relative aspect-video border-b lg:max-h-[calc(100vh-56px)]'>
      {content}
    </div>
  );
};
