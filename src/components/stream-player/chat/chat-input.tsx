'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { sendMessage } from '@/actions/chat';
import { cn } from '@/lib/utils';
import { useTyping } from '@/store/use-typing';

import { ChatInfo } from '@/components/stream-player/chat/chat-info';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatInputProps {
  viewerName: string;
  streamId: string;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

const formSchema = z.object({
  message: z.string().min(1, ' ').max(255, 'Message Limit (255 Characters)'),
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

  // Disable video player actions when typing
  const { onFocus, onBlur } = useTyping();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const onSubmit = async ({ message }: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/socket/stream-messages',
        query: { streamId },
      });

      if (isDelayed && !isDelayBlocked) {
        // SEND MESSAGE AFTER 3 SECONDS
        setIsDelayBlocked(true);
        setTimeout(async () => {
          setIsDelayBlocked(false);
          const response = await axios.post(url, {
            message,
            viewerName,
          });
        }, 3000);
      } else {
        // SEND MESSAGE IMMEDIATELY
        const response = await axios.post(url, {
          message,
          viewerName,
        });
      }
    } catch (err: any) {
      toast.error('Failed to send message');
    } finally {
      router.refresh();
      form.reset();
    }
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
                  disabled={isLoading}
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
              <FormMessage className='text-red-500' />
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

export const ChatInputSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-y-2 p-2'>
      <Skeleton className='h-10 w-full' />
      <div className='ml-auto'>
        <Skeleton className='h-9 w-16' />
      </div>
    </div>
  );
};
