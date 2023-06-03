import { geolocation, useQueryClient } from '@libs';
import { useGetOneAttendance, AttendanceService } from 'services';
import { CSSProperties } from 'react';

import { useAuthContext } from '@components/atoms';
import { Table } from '@components/molecules';
import { Default } from '@components/templates/default';
import { ModalAttendance } from '@components/organisms/modals/modal_attendance';
import { ModalIzin } from '@components/organisms/modals/modal_izin';

const styles: { [key: string]: CSSProperties } = {
  root: {}
};

export default function EmployeeKehadiran() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const { data: attendanceData } = useGetOneAttendance(user?.login_token);

  const handleAttendance = async () => {
    const distance: any = await geolocation({
      allowedLatitude: -6.2244171,
      allowedLongitude: 106.6921108
    });

    if (distance >= 10000000) {
      console.log('distance', distance);
      // notification.warning('Jarak anda teralalu jauh dari kantor');
      return console.warn('Your distance is too far from the office');
    }

    try {
      const response = await AttendanceService.postAttendance(user?.login_token);
      if (response.status === 200) {
        queryClient.invalidateQueries(['getOneAttendance']);
        // notification.success('Berhasil melakukan absensi kehadiran');
      }
    } catch (error: any) {
      console.log(error);
      // notification.failed('Gagal melakukan absensi kehadiran');
    }
  };

  console.log(attendanceData);

  return (
    <Default title="Kehadiran">
      <div className={'space-y-4'}>
        <div className={'flex justify-between space-x-4'}>
          <ModalAttendance />
          <ModalIzin />
        </div>
        <Table
          columns={[
            { label: '#', value: 'id' },
            { label: 'Tanggal Absen', value: 'createdAt' },
            { label: 'Tipe', value: 'Tidak Hadir' },
            { label: 'Status', value: 'Terlambat 1 menit' },
            { label: 'Jarak dengan kantor', value: '100 meter' }
          ]}
          data={attendanceData}
          hideActions={['edit', 'delete']}
        />
      </div>
    </Default>
  );
}
