import Head from 'next/head';
import { styles } from '@libs';
import { BackgroundImage } from '@mantine/core';
import loginBg from '@assets/images/login.png';

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
        <BackgroundImage
          className={styles(
            'p-6 w-full h-full min-h-[100vh]',
            'flex items-center justify-center'
          )}
          src={loginBg.src}>
          <div
            className={styles(
              'w-full max-w-[1152px] h-[450px]',
              'bg-white',
              'grid grid-cols-2 place-content-center justify-items-center',
              'rounded-lg',
              'overflow-hidden',
              'allMobile:grid-cols-1'
            )}>
            {children}
          </div>
        </BackgroundImage>
      </div>
    </>
  );
};

export { AuthTemplate };
