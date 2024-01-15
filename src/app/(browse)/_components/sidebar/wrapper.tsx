'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

import { sideBarVariants } from './animations';

interface WrapperProps extends PropsWithChildren {}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isLargeScreen } = useScreenSize();
  const { isExpanded } = useSidebar();

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
