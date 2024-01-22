'use client';

import { PropsWithChildren } from 'react';

import { useScreenSize } from '@/store/use-screen-size';
import { useSidebar } from '@/store/use-sidebar';

import { MotionAside } from '@/components/framer/motion-aside';
import { sideBarVariants } from './animations';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isLargeScreen } = useScreenSize();
  const { isExpanded } = useSidebar();

  return (
    <MotionAside
      className='fixed left-0 flex h-full w-[240px] flex-col items-center border-r 
      bg-[#1f1f23] pt-2 shadow-sm'
      initial={'closed'}
      animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      variants={sideBarVariants}
    >
      {children}
    </MotionAside>
  );
};
