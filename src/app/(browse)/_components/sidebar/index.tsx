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
      <Toggle />
      <Following data={following} />
      <Recommended data={recommended} />
    </Wrapper>
  );
};
