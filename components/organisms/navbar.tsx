import { useContext, useState } from 'react';
import { styles } from '@libs';
import { Burger, Drawer, Divider } from '@mantine/core';
import { useRouter } from 'next/router';
import { Menu } from '@components/molecules';
import { AuthContext } from '@components/atoms/auth/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { user: userData } = useContext(AuthContext);
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
          <p>PT CIPTA KARYA ABADI</p>
        </div>
        <Menu data={userData} />
      </div>

      <Drawer opened={isOpenSide} onClose={onCloseSide}>
        <ul className={styles('space-y-3')}>
          <li
            className={styles('cursor-pointer')}
            onClick={() =>
              router.push(`${userData.RoleId === 1 ? '/admin' : '/employee'}`)
            }>
            Dashboard
          </li>
          <li
            className={styles('cursor-pointer')}
            onClick={() =>
              router.push(
                `${
                  userData.RoleId === 1
                    ? '/admin/kehadiran'
                    : '/employee/kehadiran'
                }`
              )
            }>
            Kehadiran
          </li>
          <Divider />
          <li
            className={styles('cursor-pointer')}
            onClick={() =>
              router.push(
                `${userData.RoleId === 1 ? '/admin/absen' : '/employee/absen'}`
              )
            }>
            Request Absen
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default Navbar;
