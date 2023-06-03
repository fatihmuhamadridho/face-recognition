import Head from 'next/head';
import { Sidebar } from '@components/organisms/sidebar';
import { CSSProperties } from 'react';
import { IconHome2 } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Navbar } from '@components/organisms/navbar';

interface IDefault {
  title?: string;
  children?: any;
  [key: string]: any;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    display: 'flex'
  },
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  content: {
    padding: '25px 40px',
    width: '100%'
  }
};

const Default = ({ title, children }: IDefault) => {
  const router = useRouter();

  const topRoutes = [
    {
      title: 'Dashboard',
      path: "/employee",
      icon: <IconHome2 color="white" />,
      onClick: () => router.push('/employee')
    },
    {
      title: 'Kehadiran',
      path: "/employee/kehadiran",
      icon: <IconHome2 color="white" />,
      onClick: () => router.push('/employee/kehadiran')
    },
    {
      title: 'Users',
      path: "/employee/user",
      icon: <IconHome2 color="white" />,
      onClick: () => router.push('/employee/user')
    }
  ];

  const bottomRoutes = [
    {
      title: 'Settings',
      path: "/employee/settings",
      icon: <IconHome2 color="white" />,
      onClick: () => router.push('/employee')
    },
    {
      title: 'Logout',
      path: "/employee/logout",
      icon: <IconHome2 color="white" />,
      onClick: () => {
        localStorage.clear();
        router.push('/');
      }
    }
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div style={styles.root}>
        <Sidebar
          activePath={router.asPath}
          bottomRoutes={bottomRoutes}
          onClickLogo={() => router.push('/employee')}
          topRoutes={topRoutes}
        />
        <div style={styles.container}>
          <Navbar title={title} />
          <div style={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

export { Default };
