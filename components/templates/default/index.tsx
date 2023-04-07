import Head from 'next/head';
import { styles } from '@libs';
import { Navbar } from '@components/organisms';

interface IDefault {
  className?: string[];
  title?: string;
  children?: any;
  [key: string]: any;
}

const Default = ({ title, children }: IDefault) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles('w-full h-full min-h-[100vh]', 'flex flex-col')}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export { Default };
