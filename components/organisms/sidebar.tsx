import { styles } from '@libs';
import { Divider } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Sidebar = ({
  open,
  setOpen,
  routes,
  routesDivider
}: {
  open?: boolean;
  setOpen?: any;
  routes: any[];
  routesDivider: any[];
}) => {
  const router = useRouter();
  const [expand, setExpand] = useState<boolean>(open || false);

  const onOpen = () => {
    setExpand(true);
    setOpen && setOpen(true);
  };
  const onClose = () => {
    setExpand(false);
    setOpen && setOpen(false);
  };

  return (
    <div
      className={styles(
        `${expand ? '!w-[240px] items-start' : '!w-[80px] items-center'}`,
        'p-4',
        'bg-[#344293] text-white',
        'flex flex-col',
        'space-y-4 z-[20]',
        'duration-150'
      )}
      onMouseLeave={onClose}
      onMouseOver={onOpen}>
      {routes.map((route: any, index: any) => {
        const findDivider = routesDivider.find(
          (divider: any) => divider - 1 === index
        );
        if (findDivider) {
          return (
            <div
              className={styles(`${expand && 'w-full'}`, 'space-y-4')}
              key={index}>
              <div
                className={styles(
                  'flex items-center',
                  'space-x-2 cursor-pointer'
                )}
                onClick={() => router.push(route.endpoint)}>
                {route.icon}
                {expand && <h1 key={index}>{route.label}</h1>}
              </div>
              <Divider className={styles('w-full')} />
            </div>
          );
        }
        return (
          <div
            className={styles('flex items-center', 'space-x-2 cursor-pointer')}
            key={index}
            onClick={() => router.push(route.endpoint)}>
            {route.icon}
            {expand && <h1>{route.label}</h1>}
          </div>
        );
      })}
    </div>
  );
};

export { Sidebar };
