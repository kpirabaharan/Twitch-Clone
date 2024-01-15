import { Ghost } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className='flex h-full flex-row items-center justify-center gap-x-4'>
      <Ghost className='h-36 w-36' />
      <div className='inline-flex flex-col gap-y-2'>
        <p className='line-clamp-3 w-64 text-ellipsis text-lg text-muted-foreground'>
          Sorry. Unless you’ve got a time machine, that content is unavailable.
        </p>
        <div>
          <Button variant={'tertiary'} asChild>
            <Link href={'/'}>Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
