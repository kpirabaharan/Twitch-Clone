const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      {children}
    </div>
  );
};

export default Layout;
