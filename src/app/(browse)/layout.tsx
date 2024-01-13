import { Navbar } from './_components/navbar';

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='flex h-full pt-14'>{children}</div>
    </>
  );
};

export default BrowseLayout;
