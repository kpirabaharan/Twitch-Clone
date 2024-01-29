import { RefObject, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useTyping } from '@/store/use-typing';

export const useVolume = (ref: RefObject<HTMLVideoElement>) => {
  const [volume, setVolume] = useState(100);
  const { isTyping } = useTyping();

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

  // Toggle mute with m
  useEventListener('keydown', (event: KeyboardEvent) => {
    if (!isTyping && event.key === 'm') {
      toggleMute();
    }
  });

  return { volume, onVolumeChange, toggleMute };
};
