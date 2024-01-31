import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useRef, useState } from 'react';

import { useFullScreen } from '@/hooks/use-full-screen';

import { FullScreenControl } from '@/components/stream-player/controls/full-screen-control';
import { VolumeControl } from '@/components/stream-player/controls/volume-control';
import { useVolume } from '@/hooks/use-volume';

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isFullScreen, toggleFullScreen } = useFullScreen(wrapperRef);
  const { volume, onVolumeChange, toggleMute } = useVolume(videoRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(
      track =>
        videoRef.current && track.publication.track?.attach(videoRef.current),
    );

  return (
    <div ref={wrapperRef} className='relative flex h-full'>
      <video className='shadow-inner-upper' ref={videoRef} width={'100%'} />
      {/* VIDEO SHADOW */}
      <div className='shadow-inner-xl absolute left-0 top-0 h-full w-full opacity-0 group-hover:opacity-100' />

      {/* LIVE TEXT */}
      <div className='absolute right-4 top-2 z-10 opacity-0 group-hover:opacity-100'>
        <div className='inline-flex bg-red-700 px-1 rounded-sm'>
          <p className='text-xs uppercase font-semibold'>Live</p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className='absolute bottom-0 z-10 w-full opacity-0 group-hover:opacity-100'>
        <div className='flex h-12 w-full justify-between px-2'>
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
