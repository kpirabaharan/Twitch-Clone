import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import ThemeProvider from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Twitch Clone',
  description:
    'Create a Twitch clone with Next.js, Drizzle, Postgres, AWS, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ThemeProvider defaultTheme='system'>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
