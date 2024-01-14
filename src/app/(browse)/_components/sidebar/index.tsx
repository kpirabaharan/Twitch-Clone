import { Following } from './following';
import { Recommended } from './recommended';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const Sidebar = () => {
  const following = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'Daniel',
  ];

  const recommended = ['Olivia', 'Matthew', 'Sophia'];

  return (
    <Wrapper>
      <div className='w-[220px]'>
        <Toggle />
        <div className='mt-2 flex w-full flex-col gap-y-4'>
          <Following data={following} />
          <Recommended data={recommended} />
        </div>
      </div>
    </Wrapper>
  );
};
