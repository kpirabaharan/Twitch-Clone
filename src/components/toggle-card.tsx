'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateStream } from '@/actions/stream';
import type { StreamProperties } from '@/types';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface ToggleCardProps {
  field: StreamProperties;
  label: string;
  value: boolean;
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: boolean) => {
    startTransition(async () => {
      try {
        await updateStream({ [field]: value });
      } catch (err: any) {
        toast(err.message);
      }
    });
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-xl font-normal'>{label}</CardTitle>
        <Switch
          disabled={isPending}
          checked={value}
          onCheckedChange={() => handleChange(!value)}
        />
      </CardHeader>
    </Card>
  );
};
