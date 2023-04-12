import { useState } from 'react';
import { styles } from '@libs';
import { Menu, Drawer, DrawerList } from '@components/molecules';
import { useAuthContext, Burger, Text } from '@components/atoms';

const Navbar = () => {
  const { user: userData } = useAuthContext();
  const [isOpenSide, setIsOpenSide] = useState<boolean>(false);

  const onCloseSide = () => setIsOpenSide(false);
  const onOpenSide = () => setIsOpenSide(true);

  return (
    <>
      <div
        className={styles(
          'px-5 w-full min-h-[80px]',
          'flex items-center justify-between',
          'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
        )}>
        <div className={styles('flex items-center', 'space-x-4')}>
          <Burger opened={isOpenSide} onClick={onOpenSide} />
          <Text title="PT CIPTA KARYA ABADI" />
        </div>
        <Menu data={userData} />
      </div>

      <Drawer opened={isOpenSide} onClose={onCloseSide}>
        {userData?.RoleId === 1 && (
          <DrawerList
            data={[
              { title: 'dashboard', path: '/admin' },
              { title: 'kehadiran', path: '/admin/kehadiran' },
              { title: 'user', path: '/admin/user', isLine: true },
              { title: 'settings', path: '/admin/settings' }
            ]}
          />
        )}
        {userData?.RoleId === 2 && (
          <DrawerList
            data={[
              { title: 'dashboard', path: '/employee' },
              { title: 'kehadiran', path: '/employee/kehadiran' },
              { title: 'absen', path: '/employee/absen' }
            ]}
          />
        )}
      </Drawer>
    </>
  );
};

export { Navbar };
