import { cva, type VariantProps } from 'class-variance-authority';

// import { LiveBadge } from '@/components/live-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'h-8 w-8',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  size,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        'cursor-pointer border border-background ring-2',
        avatarSizes({ size }),
        isLive ? 'ring-red-600' : 'ring-gray-500',
      )}
    >
      <AvatarImage src={imageUrl} className='object-cover' />
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
  );
};
