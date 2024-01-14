import { create } from 'zustand';

interface SidebarStore {
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>(set => ({
  isExpanded: false,
  onExpand: () => set(() => ({ isExpanded: true })),
  onCollapse: () => set(() => ({ isExpanded: false })),
}));
