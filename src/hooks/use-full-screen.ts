import { RefObject, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useTyping } from '@/store/use-typing';

export const useFullScreen = (ref: RefObject<HTMLDivElement>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isTyping } = useTyping();

  // Toggle the fullscreen
  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (ref.current) {
      ref.current.requestFullscreen();
    }
  };

  // Listen for fullscreenchange event
  useEventListener(
    'fullscreenchange',
    () => setIsFullScreen(document.fullscreenElement !== null),
    ref,
  );

  // Toggle fullscreen when f key is pressed, only if not typing
  useEventListener('keydown', (event: KeyboardEvent) => {
    if (!isTyping && event.key === 'f') {
      toggleFullScreen();
    }
  });

  return { isFullScreen, toggleFullScreen };
};
