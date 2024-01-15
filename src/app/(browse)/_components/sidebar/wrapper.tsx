'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { sideBarVariants } from './animations';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
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
    <motion.aside
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
    </motion.aside>
  );
};
