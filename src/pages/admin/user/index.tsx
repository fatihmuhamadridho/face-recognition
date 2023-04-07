import Head from 'next/head';
import { styles } from '@libs';
import { MainLayout } from '@components/organisms';
import { Table } from '@components/molecules';
import { Button } from '@mantine/core';
import { useGetListUsers } from 'services/userService';

export default function AdminDashboard() {
  const { data: userData } = useGetListUsers();

  console.log(userData);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <div className={styles('p-5', 'space-y-4')}>
          <h1>List User</h1>
          <Button variant={'default'}>Tambah User</Button>
          <Table
            header={['No', 'Nama Lengkap', 'Role', 'Aksi']}
            data={userData?.map((row: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.email}</td>
                  <td>{row.RoleId}</td>
                  <td className={styles('space-x-2')}>
                    <Button variant={'default'}>Edit</Button>
                    <Button variant={'default'}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          />
        </div>
      </MainLayout>
    </>
  );
}
