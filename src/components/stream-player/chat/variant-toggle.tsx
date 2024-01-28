'use client';

import { MessageSquare, Users } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar();

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? MessageSquare : Users;

  const onToggle = () => {
    if (isChat) {
      onChangeVariant(ChatVariant.COMMUNITY);
    } else {
      onChangeVariant(ChatVariant.CHAT);
    }
  };

  const label = isChat
    ? `Switch to ${ChatVariant.COMMUNITY}`
    : `Switch to ${ChatVariant.CHAT}`;

  return (
    <Hint label={label} asChild side={'top'}>
      <Button onClick={onToggle} variant={'ghost'} size={'icon'}>
        <Icon className='text-muted-foreground' size={20} />
      </Button>
    </Hint>
  );
};
