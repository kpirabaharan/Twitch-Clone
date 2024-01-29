import { create } from 'zustand';

interface TypingStore {
  isTyping: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export const useTyping = create<TypingStore>(set => ({
  isTyping: false,
  onFocus: () => set(() => ({ isTyping: true })),
  onBlur: () => set(() => ({ isTyping: false })),
}));
