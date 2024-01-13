'use client';

import { SignOutButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <div>
      <h1> Sign out </h1>
      <SignOutButton />
    </div>
  );
};

export default Home;
