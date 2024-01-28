'use client';

import type { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';

import { MotionDiv } from '@/components/framer/motion-div';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
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
  const router = useRouter();
  const { isExpanded } = useCreatorSidebar();

  return (
    <Button
      className='justify-start rounded-none px-[10px]'
      variant={isActive ? 'secondary' : 'ghost'}
      onClick={() => router.push(href)}
      asChild
    >
      <MotionDiv
        initial={'closed'}
        animate={isExpanded ? 'open' : 'closed'}
        exit={isExpanded ? 'open' : 'closed'}
        variants={navItemVariants}
        className='flex h-[44px] cursor-pointer flex-row items-center 
        justify-start gap-x-4 overflow-hidden'
      >
        <div className='inline-flex h-10 w-10 shrink-0 items-center justify-center'>
          <Icon className='h-5 w-5' />
        </div>
        <p>{label}</p>
      </MotionDiv>
    </Button>
  );
};
