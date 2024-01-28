'use client';

import { useUser } from '@clerk/nextjs';
import {
  FullscreenIcon,
  HomeIcon,
  KeyRoundIcon,
  MessageSquareIcon,
  UsersIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-item';

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    { label: 'Home', href: `/u/${user?.username}`, icon: HomeIcon },
    {
      label: 'Stream',
      href: `/u/${user?.username}/stream`,
      icon: FullscreenIcon,
    },
    {
      label: 'Keys',
      href: `/u/${user?.username}/keys`,
      icon: KeyRoundIcon,
    },
    {
      label: 'Chat',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquareIcon,
    },
    {
      label: 'Community',
      href: `/u/${user?.username}/community`,
      icon: UsersIcon,
    },
  ];

  return (
    <ul className='mt-2 flex w-full flex-col'>
      {routes.map((route, index) => (
        <NavItem
          key={index}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
