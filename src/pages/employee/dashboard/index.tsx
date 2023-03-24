import Head from 'next/head';
import { MainLayout } from '@components/organisms';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout></MainLayout>
    </>
  );
}
