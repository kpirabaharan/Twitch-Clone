import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

import { cn } from '@/lib/utils';
import { QueryProvider } from '@/providers/query-provider';
import { SocketProvider } from '@/providers/socket-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Twitch Clone',
  description:
    'Create a Twitch clone with Next.js, Drizzle, Postgres, Livekit, and more.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      afterSignOutUrl={'/'}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#4f46e5' },
      }}
    >
      <html lang='en' suppressHydrationWarning>
        <body className={cn('no-scrollbar', inter.className)}>
          <ThemeProvider defaultTheme='system'>
            <SocketProvider>
              <QueryProvider>
                <Toaster richColors theme={'light'} position='bottom-right' />
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
