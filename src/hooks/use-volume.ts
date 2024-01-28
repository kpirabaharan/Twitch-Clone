import { RefObject, useState } from 'react';

export const useVolume = (ref: RefObject<HTMLVideoElement>) => {
  const [volume, setVolume] = useState(100);

  const onVolumeChange = (volume: number) => {
    ref.current!.muted = volume === 0;
    ref.current!.volume = volume / 100;
    setVolume(volume);
  };

  const toggleMute = () => {
    ref.current!.muted = volume !== 0;
    ref.current!.volume = volume === 0 ? 1 : 0;
    setVolume(volume === 0 ? 100 : 0);
  };

  return { volume, onVolumeChange, toggleMute };
};
