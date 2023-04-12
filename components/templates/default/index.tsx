import Head from 'next/head';
import { styles } from '@libs';
import { Navbar } from '@components/organisms';
import { Sidebar } from '@components/organisms';
import { useState } from 'react';
import { IconHome, IconNotebook } from '@tabler/icons-react';
import { useAuthContext } from '@components/atoms';

interface IDefault {
  className?: string[];
  title: string;
  children?: any;
  [key: string]: any;
}

const Default = ({ title, children }: IDefault) => {
  const { user: userData } = useAuthContext();
  const [expandSidebar, setExpandSidebar] = useState<boolean>(false);

  const routesSuperadmin = [
    { label: 'Dashboard', endpoint: '/admin', icon: <IconHome /> },
    {
      label: 'Kehadiran',
      endpoint: '/admin/kehadiran',
      icon: <IconNotebook />
    },
    {
      label: 'User',
      endpoint: '/admin/user',
      icon: <IconNotebook />
    },
    {
      label: 'Setting',
      endpoint: '/admin/setting',
      icon: <IconNotebook />
    }
  ];

  const routesPegawai = [
    { label: 'Dashboard', endpoint: '/employee', icon: <IconHome /> },
    {
      label: 'Kehadiran',
      endpoint: '/employee/kehadiran',
      icon: <IconNotebook />
    }
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className={styles(
          'w-full h-full min-h-[100vh]',
          'flex flex-col justify-between'
        )}>
        <Navbar />
        <div
          className={styles(
            'w-full h-full min-h-[calc(100vh-80px)]',
            'flex flex-row'
          )}>
          <Sidebar
            open={expandSidebar}
            routes={userData?.RoleId === 1 ? routesSuperadmin : routesPegawai}
            routesDivider={[3]}
            setOpen={(e: any) => setExpandSidebar(e)}
          />
          <div
            className={styles(
              `${
                expandSidebar
                  ? '!w-[calc(100vw-240px)]'
                  : '!w-[calc(100vw-80px)]'
              }`,
              'w-full h-full min-h-[calc(100vh-80px)]',
              'flex flex-col justify-between'
            )}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export { Default };
