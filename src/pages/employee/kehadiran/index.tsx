import Head from 'next/head';
import { MainLayout } from '@components/organisms';
import { Table } from '@components/molecules';
import { styles } from '@libs';
import { Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '@components/atoms/auth/AuthContext';
import { useGetOneAttendance } from 'services/attendanceService';
import { AttendanceService } from 'services/attendanceService/attendance';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminKehadiran() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { data: attendanceData } = useGetOneAttendance(user.login_token);

  const handleAttendance = async () => {
    try {
      const response = await AttendanceService.postAttendance(user.login_token);
      if (response.status === 200) {
        queryClient.invalidateQueries(['getOneAttendance']);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <div className={styles('p-5', 'space-y-4')}>
          <h1>Kehadiran</h1>
          <Button variant={'default'} onClick={handleAttendance}>
            Absen
          </Button>
          <Table data={attendanceData} />
        </div>
      </MainLayout>
    </>
  );
}
