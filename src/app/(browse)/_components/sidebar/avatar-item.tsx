import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarHint } from './avatar-hint';

interface AvatarItemProps {
  item: any;
}

export const AvatarItem = ({ item }: AvatarItemProps) => {
  return (
    <div
      className='relative flex h-8 w-full flex-row items-center gap-x-4 
      overflow-hidden pl-[9px]'
    >
      <AvatarHint
        label='L'
        side='right'
        user={item}
        asChild
        delayDuration={500}
      >
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
          className='w-[120px] overflow-hidden text-ellipsis whitespace-nowrap 
          text-xs text-muted-foreground'
        >
          League of Legends
        </p>
      </div>
      <div className='flex w-[48px] flex-row items-center gap-x-2'>
        <div className='h-2 w-2 rounded-full bg-red-600' />
        <p className='text-xs'>420</p>
      </div>
    </div>
  );
};
