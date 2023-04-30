import { Text, useAuthContext } from '@components/atoms';
import { storageHelper, styles } from '@libs';
import { Menu as MenuCore, Avatar } from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const Menu = ({ data }: any) => {
  const router = useRouter();
  const { setUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await storageHelper.remove('access_token');
      await setUser(null);
      router.push('/');
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <MenuCore shadow="md" width={200}>
      <MenuCore.Target>
        <div
          className={styles(
            'py-2 px-4',
            'flex items-center',
            'text-white',
            'rounded-[4px]',
            'space-x-2 cursor-pointer'
          )}>
          <Avatar radius={'lg'} />
          <Text title={data?.username} />
        </div>
      </MenuCore.Target>

      <MenuCore.Dropdown>
        <MenuCore.Label>Application</MenuCore.Label>
        <MenuCore.Item icon={<IconSettings size={14} />}>
          Change Password
        </MenuCore.Item>
        <MenuCore.Item
          color={'red'}
          icon={<IconLogout size={14} />}
          onClick={handleLogout}>
          Logout
        </MenuCore.Item>
      </MenuCore.Dropdown>
    </MenuCore>
  );
};

export { Menu };
