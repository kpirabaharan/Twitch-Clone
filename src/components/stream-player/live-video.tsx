import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useRef, useState } from 'react';

import { useFullScreen } from '@/hooks/use-full-screen';

import { FullScreenControl } from '@/components/stream-player/full-screen-control';
import { VolumeControl } from '@/components/stream-player/volume-control';

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isFullScreen, toggleFullScreen } = useFullScreen(wrapperRef);
  const [volume, setVolume] = useState(50);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(
      track =>
        videoRef.current && track.publication.track?.attach(videoRef.current),
    );

  const onVolumeChange = (volume: number) => {
    videoRef.current!.muted = volume === 0;
    videoRef.current!.volume = volume / 100;
    setVolume(volume);
  };
  const toggleMute = () => {
    videoRef.current!.muted = volume !== 0;
    videoRef.current!.volume = volume === 0 ? 1 : 0;
    setVolume(volume === 0 ? 100 : 0);
  };

  return (
    <div ref={wrapperRef} className='relative flex h-full'>
      <video ref={videoRef} width={'100%'} />
      <div className='absolute bottom-0 w-full opacity-0 group-hover:opacity-100'>
        <div className='flex h-12 w-full justify-between bg-black/50 px-2'>
          <VolumeControl
            volume={volume}
            onToggle={toggleMute}
            onVolumeChange={onVolumeChange}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onClick={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
