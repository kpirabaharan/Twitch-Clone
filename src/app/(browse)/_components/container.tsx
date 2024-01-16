'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { mainVariants } from './sidebar/animations';

interface ContainerProps extends PropsWithChildren {}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery('(min-width: 1024px)');
  const { isLargeScreen, setIsLargeScreen, setIsSmallScreen } = useScreenSize();
  const { isExpanded } = useSidebar();

  useEffect(() => {
    if (matches) {
      setIsLargeScreen();
    } else {
      setIsSmallScreen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return (
    <MotionDiv
      className='flex-1'
      initial={'closed'}
      animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      variants={mainVariants}
    >
      {children}
    </MotionDiv>
  );
};
