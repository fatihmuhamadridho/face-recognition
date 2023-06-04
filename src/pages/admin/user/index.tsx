import { styles } from '@libs';
import { Table } from '@components/molecules';
import { useGetListUsers } from 'services/userService';
import { Default } from '@components/templates';
import { IconSearch } from '@tabler/icons-react';
import { Button, Input } from '@mantine/core';
import { useRouter } from 'next/router';

export default function AdminUser() {
  const router = useRouter();
  const { data: userData } = useGetListUsers();

  console.log(userData);

  return (
    <Default title="User">
      <div className="flex justify-between">
        <Input icon={<IconSearch size={16} />} />
        <Button onClick={() => router.push('/admin/user/tambah-user')} variant="default">
          Tambah User
        </Button>
      </div>
      <div className="mt-4">
        <Table data={userData} />
      </div>
    </Default>
  );
}
