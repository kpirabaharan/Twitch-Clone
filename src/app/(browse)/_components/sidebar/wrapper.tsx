'use client';

import { Variants, motion } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isExpanded } = useSidebar();
  const { isLargeScreen, setIsLargeScreen, setIsSmallScreen } = useScreenSize();
  const matches = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (matches) {
      setIsLargeScreen();
    } else {
      setIsSmallScreen();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const divVariants: Variants = {
    open: {
      width: 240,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 50,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.aside
      className={cn(
        'flex flex-col items-center bg-[#1f1f23] pt-2',
        isExpanded && 'pr-0',
      )}
      initial={'closed'}
      animate={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      exit={!isLargeScreen ? 'closed' : isExpanded ? 'open' : 'closed'}
      variants={divVariants}
    >
      {children}
    </motion.aside>
  );
};
