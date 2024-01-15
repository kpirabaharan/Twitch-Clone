'use client';

import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { MotionAside } from '@/components/framer/motion-aside';
import { sideBarVariants } from './animations';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isLargeScreen } = useScreenSize();
  const { isExpanded } = useSidebar();

  return (
    <MotionAside
      className={cn(
        'fixed flex h-full flex-col items-center border-r bg-[#1f1f23] pt-2 shadow-sm',
        isExpanded && 'pr-0',
      )}
      initial={'closed'}
      animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      variants={sideBarVariants}
    >
      {children}
    </MotionAside>
  );
};
