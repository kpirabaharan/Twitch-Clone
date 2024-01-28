import { RefObject, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

export const useFullScreen = (ref: RefObject<HTMLDivElement>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  // Toggle fullscreen when f key is pressed
  useEventListener(
    'keydown',
    (event: KeyboardEvent) =>
      event.key === 'f' && !isFullScreen && toggleFullScreen(),
  );

  return { isFullScreen, toggleFullScreen };
};
