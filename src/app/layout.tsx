import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { cn } from '@/lib/utils';
import ThemeProvider from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Twitch Clone',
  description:
    'Create a Twitch clone with Next.js, Drizzle, Postgres, AWS, and more.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#4f46e5' },
      }}
    >
      <html lang='en'>
        <ThemeProvider defaultTheme='system'>
          <body className={cn('no-scrollbar', inter.className)}>
            {children}
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
