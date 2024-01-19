interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = ({ params }: CreatorPageProps) => {
  return <div>Username: {params.username}</div>;
};

export default CreatorPage;
