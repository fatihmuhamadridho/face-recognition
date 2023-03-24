import Head from 'next/head';
import { MainLayout } from '@components/organisms';
import { Table } from '@components/molecules';

export default function AdminKehadiran() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <Table />
      </MainLayout>
    </>
  );
}
