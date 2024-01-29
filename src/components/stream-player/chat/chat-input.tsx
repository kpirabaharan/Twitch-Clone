import { useState } from 'react';

import { cn } from '@/lib/utils';

import { ChatInfo } from '@/components/stream-player/chat/chat-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

export const ChatInput = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: ChatInputProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <form
      className='flex flex-col items-center justify-end gap-y-2 p-2'
      onSubmit={handleSubmit}
    >
      <div className='w-full'>
        <ChatInfo
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnlyAndNotFollowing}
        />
        <Input
          onChange={handleChange}
          value={value}
          disabled={isDisabled}
          placeholder='Send a message'
          className={cn(
            'border border-white/10',
            isFollowersOnlyAndNotFollowing && 'rounded-t-none border-t-0',
          )}
        />
      </div>
      <div className='ml-auto'>
        <Button
          type={'submit'}
          variant={'tertiary'}
          size={'sm'}
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  );
};
