'use client';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { useChatSidebar } from '@/store/use-chat-sidebar';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';

export const ChatToggle = () => {
  const { isExpanded, onExpand, onCollapse } = useChatSidebar();

  const Icon = !isExpanded ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (isExpanded) {
      onCollapse();
    } else {
      onExpand();
    }
  };

  const label = isExpanded ? 'Hide Chat' : 'Show Chat';

  return (
    <Hint label={label} asChild side={'left'}>
      <Button onClick={onToggle} variant={'ghost'} size={'icon'}>
        <Icon className='text-muted-foreground' size={20} />
      </Button>
    </Hint>
  );
};
