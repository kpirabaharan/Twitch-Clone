'use client';

import { PropsWithChildren } from 'react';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';

import { MotionAside } from '@/components/framer/motion-aside';
import { sideBarVariants } from './animations';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isExpanded } = useCreatorSidebar();

  return (
    <MotionAside
      className='fixed left-0 z-20 flex h-full w-[240px] flex-col items-center 
      border-r bg-card pt-2 shadow-sm'
      initial={'closed'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={sideBarVariants}
    >
      {children}
    </MotionAside>
  );
};
