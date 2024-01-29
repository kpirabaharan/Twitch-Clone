import { Edit2 } from 'lucide-react';

import { StreamInfoModal } from '@/components/modals/stream-info/modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface StreamInfoProps {
  title: string;
  category: string | null;
}

export const StreamInfo = ({ title, category }: StreamInfoProps) => {
  return (
    <Card className='w-[450px]'>
      <CardHeader className='flex-row items-center gap-x-4 p-3'>
        <div className='rounded-lg bg-tertiary p-1.5'>
          <Edit2 size={20} />
        </div>
        <div className='relative -top-1'>
          <CardTitle className='text-xl font-semibold'>
            Edit Your Next Stream Info
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Maximize your visibility in search results
          </p>
        </div>
        <StreamInfoModal title={title} category={category} />
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 flex flex-col gap-y-4'>
        <div>
          <p className='text-sm text-muted-foreground'>Title</p>
          <p className='text-sm font-semibold'>{title}</p>
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Category</p>
          <p className='text-sm font-semibold'>{category || 'None'}</p>
        </div>
      </CardContent>
    </Card>
  );
};
