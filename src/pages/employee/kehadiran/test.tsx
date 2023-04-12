import Head from 'next/head';
import { Table } from '@components/molecules';
import { styles, geolocation } from '@libs';
import { Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '@components/atoms/auth/AuthContext';
import { useGetOneAttendance } from 'services/attendanceService';
import { AttendanceService } from 'services/attendanceService/attendance';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminKehadiran() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { data: attendanceData } = useGetOneAttendance(user?.login_token);

  const handleAttendance = async () => {
    const distance: any = await geolocation({
      allowedLatitude: -6.2244171,
      allowedLongitude: 106.6921108
    });

    if (distance > 100) {
      console.log('distance', distance);
      return console.error('Your distance is too far from the office');
    }

    try {
      const response = await AttendanceService.postAttendance(
        user?.login_token
      );
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
      <div>
        <div className={styles('p-5', 'space-y-4')}>
          <h1>Kehadiran</h1>
          <Button variant={'default'} onClick={handleAttendance}>
            Absen
          </Button>
          <Table
            headers={['No', 'Tanggal Absen', 'Tipe', 'Status']}
            data={attendanceData?.map((row: any, index: any) => {
              return (
                <tr key={index}>
                  <td className={styles('w-[50px]')}>{index + 1}</td>
                  <td className={styles('w-[300px]')}>{row.createdAt}</td>
                  <td>Tidak Hadir</td>
                  <td>Terlambat 1 menit</td>
                </tr>
              );
            })}
          />
        </div>
      </div>
    </>
  );
}
