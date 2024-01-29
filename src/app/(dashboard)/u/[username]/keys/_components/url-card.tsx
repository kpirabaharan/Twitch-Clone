import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CopyButton } from './copy-button';

interface UrlCardProps {
  url: string | null;
}

export const UrlCard = ({ url }: UrlCardProps) => {
  return (
    <Card className='flex flex-row items-center gap-x-4 p-6'>
      <p className='shrink-0 font-semibold'>Server URL</p>
      <Input value={url || ''} disabled />
      <CopyButton value={url || ''} />
    </Card>
  );
};
