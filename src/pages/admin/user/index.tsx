import { useGetListUsers } from 'services/userService';
import { Default } from '@components/templates';
import { IconSearch } from '@tabler/icons-react';
import { Button, Input, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { Table } from '@components/molecules/table2';

export default function AdminUser() {
  const router = useRouter();
  const { data: userData } = useGetListUsers();

  const renderActions = () => {
    return (
      <div className="flex items-center">
        <Text
          className="cursor-pointer px-[15px]"
          color="#10B981"
          fw={300}
          fz={14}
          lh={'20px'}>
          Edit
        </Text>
      </div>
    );
  };

  const tableHeader = [
    { label: 'Id', key: 'username' },
    { label: 'Username', key: 'username' },
    { label: 'Role', key: 'username' },
    { label: 'Actions', key: renderActions },
  ];

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
        <Table header={tableHeader} />
      </div>
    </Default>
  );
}
