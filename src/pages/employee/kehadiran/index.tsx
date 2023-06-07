import { geolocation, useQueryClient } from '@libs';
import { useGetOneAttendance, AttendanceService } from 'services';
import { CSSProperties } from 'react';

import { useAuthContext } from '@components/atoms';
import { Default } from '@components/templates/default';
import { ModalAttendance } from '@components/organisms/modals/modal_attendance';
import { ModalIzin } from '@components/organisms/modals/modal_izin';
import { Text } from '@mantine/core';
import { Table } from '@components/molecules/table2';

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

  const renderActions = () => {
    return (
      <div className="flex items-center">
        <Text
          className="cursor-pointer px-[15px]"
          color="#10B981"
          fw={300}
          fz={14}
          lh={'20px'}>
          Edit
        </Text>
      </div>
    );
  };

  const tableHeader = [
    { label: 'Tanggal', key: 'createdAt' },
    { label: 'Tipe', key: 'type' },
    { label: 'Status', key: 'status' },
    { label: 'Actions', key: renderActions },
  ];

  console.log(attendanceData);

  return (
    <Default title="Kehadiran">
      <div className={'space-y-4'}>
        <div className={'flex space-x-4'}>
          <ModalAttendance />
          <ModalIzin />
        </div>
        <Table data={attendanceData} header={tableHeader} />
      </div>
    </Default>
  );
}
