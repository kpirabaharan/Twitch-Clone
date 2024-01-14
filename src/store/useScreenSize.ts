import { create } from 'zustand';

interface ScreenSizeStore {
  isLargeScreen: boolean;
  setIsLargeScreen: () => void;
  setIsSmallScreen: () => void;
}

export const useScreenSize = create<ScreenSizeStore>(set => ({
  isLargeScreen: true,
  setIsLargeScreen: () => set(() => ({ isLargeScreen: true })),
  setIsSmallScreen: () => set(() => ({ isLargeScreen: false })),
}));
