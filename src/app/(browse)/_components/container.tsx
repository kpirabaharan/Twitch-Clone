'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useScreenSize } from '@/store/useScreenSize';
import { useSidebar } from '@/store/useSidebar';

interface ContainerProps extends PropsWithChildren {}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery('(min-width: 1024px)');
  const { setIsLargeScreen, setIsSmallScreen } = useScreenSize();
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
    <div
      className={cn('flex-1', isExpanded ? 'ml-[50px] lg:ml-60' : 'ml-[50px]')}
    >
      {children}
    </div>
  );
};
