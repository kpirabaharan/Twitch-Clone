import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarItemProps {
  item: any;
}

export const AvatarItem = ({ item }: AvatarItemProps) => {
  return (
    <div className='flex w-full flex-row items-center gap-x-4 overflow-hidden pl-[6px]'>
      <Avatar className='h-8 w-8 cursor-pointer'>
        <AvatarImage src={`https://github.com/${item}.png`} />
        <AvatarFallback>{'F'}</AvatarFallback>
      </Avatar>
      <p className='text-center text-xs'>{item}</p>
    </div>
  );
};
