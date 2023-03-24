import { styles } from '@libs';
import { Menu as MenuCore, Avatar } from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';

const Menu = () => {
  return (
    <MenuCore shadow="md" width={200}>
      <MenuCore.Target>
        <div
          className={styles(
            'py-2 px-4',
            'flex items-center',
            'bg-blue-300 text-white',
            'rounded-[4px]',
            'space-x-4 cursor-pointer'
          )}>
          <Avatar radius={'lg'} />
          <p>Superadmin</p>
        </div>
      </MenuCore.Target>

      <MenuCore.Dropdown>
        <MenuCore.Label>Application</MenuCore.Label>
        <MenuCore.Item icon={<IconSettings size={14} />}>
          Settings
        </MenuCore.Item>
        <MenuCore.Item color={'red'} icon={<IconLogout size={14} />}>
          Logout
        </MenuCore.Item>
      </MenuCore.Dropdown>
    </MenuCore>
  );
};

export default Menu;
