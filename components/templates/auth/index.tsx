import Head from 'next/head';
import { styles } from '@libs';

interface IAuthTemplate {
  title: string;
  children?: any;
  [key: string]: any;
}

const AuthTemplate = ({ title, children }: IAuthTemplate) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles('w-full h-full min-w-[100vw] min-h-[100vh]')}>
        {children}
      </div>
    </>
  );
};

export { AuthTemplate };
