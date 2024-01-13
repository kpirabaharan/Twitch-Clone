'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
  return (
    <div className='flex flex-row items-center gap-x-[2px]'>
      <Input
        className='border-0 outline-none focus-visible:ring-0 
        focus-visible:ring-transparent'
      />
      <Button size={'icon'} variant={'secondary'}>
        <SearchIcon />
      </Button>
    </div>
  );
};
