'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { MotionDiv } from '@/components/framer/motion-div';
import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';
import { Variants } from 'framer-motion';

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

  const variants: Variants = {
    open: {
      marginLeft: 240,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      marginLeft: 50,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <MotionDiv
      className='flex-1'
      initial={'closed'}
      animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      variants={variants}
    >
      {children}
    </MotionDiv>
  );
};
