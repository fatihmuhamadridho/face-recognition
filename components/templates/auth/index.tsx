import Head from 'next/head';
import { styles } from '@libs';
import { BackgroundImage } from '@mantine/core';
import BG_Login from '@assets/images/login.png';

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
      <div className={'h-full min-h-[100vh] w-full min-w-[100vw]'}>
        <BackgroundImage
          className={'flex h-full min-h-[100vh] w-full items-center justify-center p-6'}
          src={BG_Login.src}>
          <div
            className={styles(
              'grid h-[600px] w-full max-w-[1140px]',
              'grid-cols-2 place-content-center justify-items-center',
              'overflow-hidden rounded-[16px] bg-white',
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
