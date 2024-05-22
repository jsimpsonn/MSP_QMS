import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('../components/Home'), { ssr: false });

const Page: React.FC = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Page;