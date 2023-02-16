import { Suspense } from 'react';

import { Container } from './_components/container';
import { Navbar } from './_components/navbar';
import { Sidebar, SidebarSkeleton } from './_components/sidebar';

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='flex h-full bg-background pt-14'>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default BrowseLayout;
