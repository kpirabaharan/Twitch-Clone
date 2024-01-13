'use client';

import { Variants } from 'framer-motion';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { useState } from 'react';

import { MotionDiv } from '@/components/motion-div';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const [isSidebar, setIsSidebar] = useState(false);

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

  const div2Variants: Variants = {
    open: {
      x: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      x: -90,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const pVariants: Variants = {
    open: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    closed: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionDiv
      className='flex w-full flex-col items-center gap-y-3 bg-[#1f1f23] px-1 
      pt-2'
      initial={'closed'}
      animate={isSidebar ? 'open' : 'closed'}
      exit={isSidebar ? 'open' : 'closed'}
      variants={divVariants}
    >
      <MotionDiv
        className='flex w-[220px] flex-row items-center justify-between'
        initial={'closed'}
        animate={isSidebar ? 'open' : 'closed'}
        exit={isSidebar ? 'open' : 'closed'}
        variants={div2Variants}
      >
        <p className='text-sm'>Recommended Channels</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setIsSidebar(state => !state)}
        >
          {isSidebar ? (
            <PanelLeftCloseIcon className='h-5 w-5' />
          ) : (
            <PanelLeftOpenIcon className='h-5 w-5' />
          )}
        </Button>
      </MotionDiv>
      {[
        'John',
        'Jane',
        'Michael',
        'Emily',
        'David',
        'Sarah',
        'Daniel',
        'Olivia',
        'Matthew',
        'Sophia',
      ].map((name, i) => (
        <div
          key={i}
          className='flex w-full flex-row items-center gap-x-4 overflow-hidden pl-[6px]'
        >
          <Avatar className='h-8 w-8 cursor-pointer'>
            <AvatarImage src={`https://github.com/${name}.png`} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className='text-center text-xs'>{name}</p>
        </div>
      ))}
    </MotionDiv>
  );
};
