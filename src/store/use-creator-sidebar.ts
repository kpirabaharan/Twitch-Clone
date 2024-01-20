import { create } from 'zustand';

interface CreatorSidebarStore {
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>(set => ({
  isExpanded: false,
  onExpand: () => set(() => ({ isExpanded: true })),
  onCollapse: () => set(() => ({ isExpanded: false })),
}));
