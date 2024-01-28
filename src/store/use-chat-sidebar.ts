import { create } from 'zustand';

export enum ChatVariant {
  CHAT = 'Chat',
  COMMUNITY = 'Community',
}

interface ChatSidebarStore {
  isExpanded: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>(set => ({
  isExpanded: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ isExpanded: true })),
  onCollapse: () => set(() => ({ isExpanded: false })),
  onChangeVariant: variant => set(() => ({ variant })),
}));
