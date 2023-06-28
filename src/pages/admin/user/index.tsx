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

export default function AdminUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData } = useGetListUsers();
  console.log(userData);

  const renderRoles = (data: any) => (
    <Text>{data.RoleId === 1 ? 'Superadmin' : 'Pegawai'}</Text>
  );
  const renderFullName = (data: any) => (
    <Text>{`${data?.UserDetail?.first_name} ${data?.UserDetail?.last_name}`}</Text>
  );
  const renderGender = (data: any) => <Text>{data?.UserDetail?.gender}</Text>;
  const renderTTL = (data: any) => <Text>{dayjs(data?.UserDetail?.birth_date).format("DD-MM-YYYY")}</Text>
  const renderActions = (data: any) => {
    console.log(data.id);
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
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Default title="User">
      <div className="flex justify-between">
        <Input icon={<IconSearch size={16} />} />
        <Button onClick={() => router.push('/admin/user/tambah-user')} variant="default">
          Tambah User
        </Button>
      </div>
      <div className="mt-4">
        <Table data={userData} header={tableHeader} />
      </div>
    </Default>
  );
}
