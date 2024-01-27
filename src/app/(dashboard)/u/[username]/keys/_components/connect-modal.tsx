'use client';

import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { createIngress } from '@/actions/ingress';

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

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(async () => {
      try {
        await createIngress(parseInt(ingressType, 10));
        toast.success('Ingress Created');
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        closeRef.current?.click();
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'default'}>Generate</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate Connection</AlertDialogTitle>
        </AlertDialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={value => setIngressType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Ingress Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
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
          <AlertDialogCancel ref={closeRef} disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onSubmit}>
            Generate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
