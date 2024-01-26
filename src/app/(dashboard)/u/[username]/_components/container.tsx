'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { useScreenSize } from '@/store/use-screen-size';

import { MotionDiv } from '@/components/framer/motion-div';
import { mainVariants } from './sidebar/animations';

interface ContainerProps extends PropsWithChildren {}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery('(min-width: 1024px)');
  const { setIsLargeScreen, setIsSmallScreen } = useScreenSize();
  const { isExpanded, onCollapse } = useCreatorSidebar();

  useEffect(() => {
    if (matches) {
      setIsLargeScreen();
    } else {
      onCollapse();
      setIsSmallScreen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return (
    <MotionDiv
      className='flex-1 p-6'
      initial={'closed'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={mainVariants}
    >
      {children}
    </MotionDiv>
  );
};
