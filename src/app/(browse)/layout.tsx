import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='flex h-full bg-background pt-14'>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default BrowseLayout;
