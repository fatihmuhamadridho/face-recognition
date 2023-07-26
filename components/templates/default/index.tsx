import Head from 'next/head';
import { Sidebar } from '@components/organisms/sidebar';
import { CSSProperties, useEffect } from 'react';
import { IconClipboardList, IconHome2, IconLogout, IconSettings, IconUsers } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Navbar } from '@components/organisms/navbar';
import { useAuthContext } from '@components/atoms';
import { notifications } from '@mantine/notifications';

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
  const { user, setUser, setAccessToken } = useAuthContext();
  // console.log(user, router.asPath);

  useEffect(() => {
    if (user?.RoleId === 1 && router.asPath.includes("/employee")) {
      router.push("/admin")
    }

    if (user?.RoleId === 2 && router.asPath.includes("/admin")) {
      router.push("/employee")
    }
  }, [router, user?.RoleId])

  const pegawaiTopRoutes = [
    {
      title: 'Dashboard',
      path: "/employee",
      icon: <IconHome2 color="white" />,
      onClick: () => router.push('/employee')
    },
    {
      title: 'Kehadiran',
      path: "/employee/kehadiran",
      icon: <IconClipboardList color="white" />,
      onClick: () => router.push('/employee/kehadiran')
    },
  ];

  const adminTopRoutes = [
    {
      title: 'Dashboard',
      path: "/admin",
      icon: <IconHome2 color="white" />,
      onClick: () => router.push('/admin')
    },
    {
      title: 'Kehadiran',
      path: "/admin/kehadiran",
      icon: <IconClipboardList color="white" />,
      onClick: () => router.push('/admin/kehadiran')
    },
    {
      title: 'Users',
      path: "/admin/user",
      icon: <IconUsers color="white" />,
      onClick: () => router.push('/admin/user')
    }
  ];

  const adminBottomRoutes = [
    {
      title: 'Settings',
      path: "/admin/setting",
      icon: <IconSettings color="white" />,
      onClick: () => router.push('/admin/setting')
    },
    {
      title: 'Logout',
      path: "/",
      icon: <IconLogout color="white" />,
      onClick: async () => {
        await localStorage.clear();
        await setUser(null);
        await setAccessToken("");
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Logout',
          color: 'green'
        });
        router.push('/');
      }
    }
  ];

  const pegawaiBottomRoutes = [
    {
      title: 'Logout',
      path: "/",
      icon: <IconLogout color="white" />,
      onClick: async () => {
        await localStorage.clear();
        await setUser(null);
        await setAccessToken("");
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Logout',
          color: 'green'
        });
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
          bottomRoutes={user?.RoleId === 1 ? adminBottomRoutes : pegawaiBottomRoutes}
          onClickLogo={() => router.push(user?.RoleId === 1 ? '/admin' : '/employee')}
          topRoutes={user?.RoleId === 1 ? adminTopRoutes : pegawaiTopRoutes}
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
