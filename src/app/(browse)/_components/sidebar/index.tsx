import { getRecommended } from '@/lib/recommended-service';
import { Recommended } from './recommended';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const revalidate = 0;

export const Sidebar = async () => {
  const following = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'Daniel',
  ];

  const recommended = await getRecommended();

  console.log(recommended);

  return (
    <Wrapper>
      <Toggle />
      {/* <Following data={following} /> */}
      <Recommended data={recommended} />
    </Wrapper>
  );
};
