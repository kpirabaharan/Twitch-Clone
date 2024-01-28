import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useRef } from 'react';

import { useFullScreen } from '@/hooks/use-full-screen';
import { FullScreenControl } from './full-screen-control';

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isFullScreen, toggleFullScreen } = useFullScreen(wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(
      track =>
        videoRef.current && track.publication.track?.attach(videoRef.current),
    );

  return (
    <div ref={wrapperRef} className='relative flex h-full'>
      <video ref={videoRef} width={'100%'} />
      <div className='absolute bottom-0 w-full opacity-0 group-hover:opacity-100'>
        <div className='flex h-12 w-full justify-end bg-black/20 px-2'>
          <FullScreenControl
            isFullScreen={isFullScreen}
            onClick={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
