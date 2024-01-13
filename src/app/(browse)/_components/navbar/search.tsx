'use client';

import { SearchIcon, X } from 'lucide-react';
import qs from 'query-string';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: value },
      },
      { skipEmptyString: true },
    );

    router.push(url);
  };

  const onClear = () => setValue('');

  return (
    <form onSubmit={onSubmit} className='relative flex flex-row items-center'>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Search'
        className='rounded-r-none border-0 outline-none 
        focus-visible:ring-0 focus-visible:ring-transparent 
        focus-visible:ring-offset-0'
      />
      {value && (
        <X
          onClick={onClear}
          className='absolute right-12 h-5 w-5 cursor-pointer transition 
          hover:opacity-75'
        />
      )}
      <Button
        type={'submit'}
        className='group rounded-l-none'
        size={'icon'}
        variant={'secondary'}
      >
        <SearchIcon className='h-5 w-5 group-hover:opacity-75' />
      </Button>
    </form>
  );
};
