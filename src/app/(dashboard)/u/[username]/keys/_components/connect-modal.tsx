'use client';

import { AlertTriangle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ConnectModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'default'}>Generate</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate Connection</AlertDialogTitle>
        </AlertDialogHeader>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Ingress Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='RTMP'>RTMP</SelectItem>
            <SelectItem value='WHIP'>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <AlertDialogDescription>
          <Alert>
            <AlertTriangle size={16} />
            <AlertTitle>Are you absolutely sure?</AlertTitle>
            <AlertDescription>
              This action will reset all active streams using the current
              connection.
            </AlertDescription>
          </Alert>
        </AlertDialogDescription>
        <AlertDialogFooter className='sm:justify-between'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {}}>Generate</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
