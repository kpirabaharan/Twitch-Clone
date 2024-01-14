'use client';

import { Variants, motion } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isExpanded, onCollapse } = useSidebar();
  const isNotLargeScreen = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    if (isNotLargeScreen) {
      onCollapse();
    }
  }, [isNotLargeScreen, onCollapse]);

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
        'flex w-full flex-col items-center gap-y-3 bg-[#1f1f23] px-1 pt-2',
        isExpanded && 'pr-0',
      )}
      initial={'closed'}
      animate={isExpanded ? 'open' : 'closed'}
      exit={isExpanded ? 'open' : 'closed'}
      variants={divVariants}
    >
      {children}
    </motion.aside>
  );
};
