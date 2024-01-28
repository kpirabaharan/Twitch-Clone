import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useRef } from 'react';

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(
      track =>
        videoRef.current && track.publication.track?.attach(videoRef.current),
    );

  return (
    <div ref={wrapperRef} className='relative flex h-full'>
      <video ref={videoRef} width={'100%'} />
    </div>
  );
};
