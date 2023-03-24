import Head from 'next/head';
import { MainLayout } from '@components/organisms';
import { Table } from '@components/molecules';
import { styles } from '@libs';
import { Button } from '@mantine/core';

export default function AdminKehadiran() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <div className={styles('p-5', 'space-y-4')}>
          <h1>Kehadiran</h1>
          <Button variant={'default'}>Absen</Button>
          <Table />
        </div>
      </MainLayout>
    </>
  );
}
