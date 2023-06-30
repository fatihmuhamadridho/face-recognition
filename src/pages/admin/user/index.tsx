import { useGetListUsers } from 'services/userService';
import { Default } from '@components/templates';
import { IconSearch } from '@tabler/icons-react';
import { Button, Input, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { Table } from '@components/molecules/table2';
import { ModalValidation } from '@components/organisms/modals/modal_validation';
import { UserService } from 'services/userService/user';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function AdminUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData } = useGetListUsers();
  const [searchInput, setSearchInput] = useState<string>('');

  const renderRoles = (data: any) => (
    <Text>{data.RoleId === 1 ? 'Superadmin' : 'Pegawai'}</Text>
  );
  const renderFullName = (data: any) => (
    <Text>{`${data?.UserDetail?.first_name} ${data?.UserDetail?.last_name}`}</Text>
  );
  const renderGender = (data: any) => <Text>{data?.UserDetail?.gender}</Text>;
  const renderTTL = (data: any) => (
    <Text>{dayjs(data?.UserDetail?.birth_date).format('DD-MM-YYYY')}</Text>
  );
  const renderActions = (data: any) => {
    return (
      <div className="flex items-center">
        <Text
          className="cursor-pointer px-[15px]"
          color="#10B981"
          fw={300}
          fz={14}
          lh={'20px'}
          onClick={() => router.push('/admin/user/edit-user/' + data.id)}>
          Edit
        </Text>
        <ModalValidation onClick={() => handleDeleteUser(data.id)} />
      </div>
    );
  };

  const tableHeader = [
    { label: 'Id', key: 'id' },
    { label: 'Username', key: 'username' },
    { label: 'Role', key: renderRoles },
    { label: 'Nama Lengkap', key: renderFullName },
    { label: 'Jenis Kelamin', key: renderGender },
    { label: 'TTL', key: renderTTL },
    { label: 'Actions', key: renderActions }
  ];

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await UserService.deleteUser(id);

      if (response.status === 200) {
        console.log(response.data);
        await queryClient.invalidateQueries(['listUsers']);
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Delete User',
          color: 'green'
        });
      } else {
        await notifications.show({
          title: 'Gagal',
          message: 'Gagal Delete User',
          color: 'red'
        });
      }
    } catch (error: any) {
      await notifications.show({
        title: 'Gagal',
        message: 'Gagal Delete User',
        color: 'red'
      });
      console.error(error);
    }
  };

  return (
    <Default title="User">
      <div className="flex justify-between">
        <Input
          icon={<IconSearch size={16} />}
          onChange={(e: any) => setSearchInput(e.target.value)}
          placeholder="Cari username"
          value={searchInput}
        />
        <Button onClick={() => router.push('/admin/user/tambah-user')} variant="default">
          Tambah User
        </Button>
      </div>
      <div className="mt-4">
        <Table
          data={userData?.filter((val: any) => {
            if (searchInput !== '') {
              if (
                String(val.username).toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return val;
              } else {
                return null;
              }
            }

            return val;
          })}
          header={tableHeader}
          height={550}
        />
      </div>
    </Default>
  );
}
