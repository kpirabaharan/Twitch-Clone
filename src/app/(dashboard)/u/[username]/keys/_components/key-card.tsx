'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CopyButton } from './copy-button';

interface KeyCardProps {
  data: string | null;
}

export const KeyCard = ({ data }: KeyCardProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Card className='flex flex-row items-start gap-x-4 p-6'>
      <p className='shrink-0 font-semibold leading-10'>Stream Key</p>
      <div className='flex flex-1 flex-col gap-y-4'>
        <Input
          className='border-0 outline-none focus-visible:ring-0 
          focus-visible:ring-transparent focus-visible:ring-offset-0'
          disabled
          value={data || ''}
          type={isShow ? 'text' : 'password'}
        />
        <div>
          <Button
            disabled={!data}
            onClick={() => setIsShow(prev => !prev)}
            variant={'link'}
            size={'sm'}
          >
            {isShow ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
      <CopyButton value={data || ''} />
    </Card>
  );
};
