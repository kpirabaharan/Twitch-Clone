'use client';

import { useParticipants } from '@livekit/components-react';
import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { useTyping } from '@/store/use-typing';

import { CommunityItem } from '@/components/stream-player/chat/community-item';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

interface CommunityListProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const CommunityList = ({
  hostName,
  viewerName,
  isHidden,
}: CommunityListProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const { onFocus, onBlur } = useTyping();

  // Get Participants of the Stream
  const participants = useParticipants();

  const onChange = (value: string) => {
    setValue(value);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some(p => p.identity === hostAsViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    );

    return deduped.filter(participant =>
      participant.name?.toLowerCase().includes(debouncedValue.toLowerCase()),
    );
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-muted-foreground'>Community is Disabled</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <Input
        onChange={e => onChange(e.target.value)}
        placeholder='Search Community'
        className='border border-white/10'
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <ScrollArea className='mt-2 flex flex-col gap-y-2'>
        <p className='hidden p-2 text-center text-muted-foreground last:block'>
          No Results
        </p>
        {filteredParticipants.map(participant => (
          <CommunityItem
            key={participant.sid}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantId={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
