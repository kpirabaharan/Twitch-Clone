'use client';

import type { LucideIcon } from 'lucide-react';

import { MotionDiv } from '@/components/framer/motion-div';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { navItemVariants } from './animations';

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  label,
  icon: Icon,
  href,
  isActive,
}: NavItemProps) => {
  const { isExpanded } = useCreatorSidebar();

  return (
    <Button variant={'ghost'} asChild>
      <MotionDiv
        initial={'closed'}
        animate={isExpanded ? 'open' : 'closed'}
        exit={isExpanded ? 'open' : 'closed'}
        variants={navItemVariants}
        className={cn(
          'flex flex-row items-center justify-between gap-x-8 px-[10px]',
        )}
      >
        <div className='inline-flex min-h-10 min-w-10 items-center justify-center'>
          <Icon className='h-5 w-5' />
        </div>
        <p className='overflow-hidden'>{label}</p>
      </MotionDiv>
    </Button>
  );
};
