interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className='text-2xl font-bold'>{title}</h1>;
};
