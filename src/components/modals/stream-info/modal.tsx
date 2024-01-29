'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { updateStream } from '@/actions/stream';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Please enter a title.' })
    .max(255, { message: 'Title must be less than 255 characters.' }),
  category: z
    .string()
    .max(255, { message: 'Category must be less than 255 characters.' }),
});

interface StreamInfoModalProps {
  title: string;
  category: string | null;
}

export const StreamInfoModal = ({ title, category }: StreamInfoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      category: !!category ? category : '',
    },
  });

  const isLoading = form.formState.isSubmitting || isPending;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await updateStream(values);
        toast.success('Stream Info Updated');
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsOpen(false);
      }
    });
  };

  const onChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button
          className='relative -right-1 -top-4 ml-auto text-tertiary'
          variant={'link'}
          size={'sm'}
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-xl'>
        <DialogHeader>
          <DialogTitle>Edit Your Stream Info</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className='border' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input className='border' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='flex-row justify-end gap-2'>
              <DialogClose asChild>
                <Button
                  type={'button'}
                  disabled={isLoading}
                  variant={'outline'}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type={'submit'} variant={'tertiary'}>
                Done
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
