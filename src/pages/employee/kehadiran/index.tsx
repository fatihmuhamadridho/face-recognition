import { geolocation, styles } from '@libs';
import { Default } from '@components/templates';
import { Button } from '@mantine/core';
import { Table } from '@components/molecules';
import { useAuthContext } from '@components/atoms';
import { useGetOneAttendance } from 'services/attendanceService';
import { AttendanceService } from 'services/attendanceService/attendance';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminKehadiran() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const { data: attendanceData } = useGetOneAttendance(user.login_token);

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
      const response = await AttendanceService.postAttendance(user.login_token);
      if (response.status === 200) {
        queryClient.invalidateQueries(['getOneAttendance']);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log(attendanceData);

  return (
    <Default title="Kehadiran">
      <div className={styles('p-5', 'space-y-4')}>
        <h1>Kehadiran</h1>
        <Button variant={'default'} onClick={handleAttendance}>
          Absen
        </Button>
        <Table
          // headers={['No', 'Tanggal Absen', 'Tipe', 'Status']}
          data={attendanceData}
        />
      </div>
    </Default>
  );
}
