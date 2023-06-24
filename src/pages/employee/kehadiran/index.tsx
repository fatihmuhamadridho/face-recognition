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
  const { user } = useAuthContext();
  const { data: attendanceData } = useGetOneAttendance(user?.login_token);

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
    { label: 'Waktu', key: 'updatedAt' },
    { label: 'Status', key: 'status' },
    { label: 'Jarak', key: 'distance' },
    { label: 'Keterangan', key: 'description' },
    { label: 'Actions', key: renderActions }
  ];

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
