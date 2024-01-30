'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { sendMessage } from '@/actions/chat';
import { cn } from '@/lib/utils';
import { useTyping } from '@/store/use-typing';

import { ChatInfo } from '@/components/stream-player/chat/chat-info';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  viewerName: string;
  streamId: string;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

const formSchema = z.object({
  message: z.string().min(1).max(255),
});

export const ChatInput = ({
  viewerName,
  streamId,
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: ChatInputProps) => {
  const router = useRouter();
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // Disable video player actions when typing
  const { onFocus, onBlur } = useTyping();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        if (isDelayed && !isDelayBlocked) {
          setIsDelayBlocked(true);
          setTimeout(async () => {
            setIsDelayBlocked(false);
            await sendMessage({ ...values, viewerName, streamId });
          }, 3000);
        } else {
          await sendMessage({ ...values, viewerName, streamId });
        }
      } catch (err: any) {
        toast.error('Failed to send message');
      } finally {
        router.refresh();
        form.reset();
      }
    });
  };

  if (isHidden) return null;

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col items-center justify-end gap-y-2 p-2'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ChatInfo
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnlyAndNotFollowing}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  disabled={isPending}
                  onFocus={onFocus}
                  placeholder='Send a message'
                  className={cn(
                    'border border-white/10',
                    isFollowersOnlyAndNotFollowing &&
                      'rounded-t-none border-t-0',
                  )}
                  {...field}
                  onBlur={e => {
                    field.onBlur();
                    onBlur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
    </Form>
  );
};
