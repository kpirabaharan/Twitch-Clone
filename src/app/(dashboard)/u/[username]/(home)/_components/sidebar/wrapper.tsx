'use client';

import { PropsWithChildren } from 'react';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { useScreenSize } from '@/store/use-screen-size';

import { MotionAside } from '@/components/framer/motion-aside';
import { sideBarVariants } from './animations';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isLargeScreen } = useScreenSize();
  const { isExpanded } = useCreatorSidebar();

  return (
    <MotionAside
      className='fixed left-0 flex h-full w-[240px] flex-col items-center border-r 
      bg-[#1f1f23] pt-2 shadow-sm'
      initial={'closed'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={sideBarVariants}
    >
      {children}
    </MotionAside>
  );
};
