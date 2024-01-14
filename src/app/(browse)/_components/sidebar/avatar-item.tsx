import { Variants } from 'framer-motion';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/store/useSidebar';
import { AvatarHint } from './avatar-hint';

interface AvatarItemProps {
  item: any;
}

export const AvatarItem = ({ item }: AvatarItemProps) => {
  const { isExpanded } = useSidebar();

  const toggleDivVariants: Variants = {
    open: {
      width: 220,
      x: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 50,
      x: 90,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <div
      className='relative flex h-8 w-full flex-row items-center gap-x-4 
      overflow-hidden pl-[9px]'
    >
      <AvatarHint label='L' side='right' user={item} asChild delayDuration={500}>
        <Avatar className='h-8 w-8 cursor-pointer'>
          <AvatarImage src={`https://github.com/${item}.png`} />
          <AvatarFallback>{'F'}</AvatarFallback>
        </Avatar>
      </AvatarHint>
      <div>
        <p
          className='overflow-hidden text-ellipsis whitespace-nowrap text-xs 
          font-semibold'
        >
          {item}
        </p>
        <p
          className='overflow-hidden text-ellipsis whitespace-nowrap text-xs 
          text-muted-foreground'
        >
          League of Legends
        </p>
      </div>
      <div className='ml-auto mr-4 flex flex-row items-center gap-x-2'>
        <div className='h-2 w-2 rounded-full bg-red-600' />
        <p className='text-xs'>420</p>
      </div>
    </div>
  );
};
