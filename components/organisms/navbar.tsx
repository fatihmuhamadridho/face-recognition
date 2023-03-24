import { useState } from 'react';
import { styles } from '@libs';
import { Burger, Drawer, Divider } from '@mantine/core';
import { useRouter } from 'next/router';
import { Menu } from '@components/molecules';

const Navbar = () => {
  const router = useRouter();
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
        <Menu />
      </div>

      <Drawer opened={isOpenSide} onClose={onCloseSide}>
        <ul className={styles('space-y-3')}>
          <li
            className={styles('cursor-pointer')}
            onClick={() => router.push('/dashboard')}>
            Dashboard
          </li>
          <li
            className={styles('cursor-pointer')}
            onClick={() => router.push('/kehadiran')}>
            Kehadiran
          </li>
          <Divider />
          <li
            className={styles('cursor-pointer')}
            onClick={() => router.push('/absen')}>
            Request Absen
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default Navbar;
