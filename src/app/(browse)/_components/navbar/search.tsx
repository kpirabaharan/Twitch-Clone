'use client';

import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Search = () => {
  return (
    <form className='flex flex-row items-center'>
      <Input
        placeholder='Search'
        className='rounded-r-none border-0 outline-none 
        focus-visible:ring-0 focus-visible:ring-transparent 
        focus-visible:ring-offset-0'
      />
      <Button
        type={'submit'}
        className='rounded-l-none'
        size={'icon'}
        variant={'secondary'}
      >
        <SearchIcon className='h-5 w-5' />
      </Button>
    </form>
  );
};
