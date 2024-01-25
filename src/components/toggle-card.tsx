'use client';

import { useState } from 'react';
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
  const [switchValue, setSwitchValue] = useState(value);

  const handleChange = async () => {
    const prevSwitchValue = switchValue;

    try {
      setSwitchValue(!prevSwitchValue);
      await updateStream({ [field]: !prevSwitchValue });
    } catch (err: any) {
      setSwitchValue(prevSwitchValue);
      toast(err.message);
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-xl font-normal'>{label}</CardTitle>
        <Switch checked={switchValue} onCheckedChange={() => handleChange()} />
      </CardHeader>
    </Card>
  );
};
