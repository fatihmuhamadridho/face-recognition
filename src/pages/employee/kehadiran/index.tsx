import { useGetOneAttendance } from 'services';
import { CSSProperties } from 'react';

import { useAuthContext } from '@components/atoms';
import { Default } from '@components/templates/default';
import { ModalAttendance } from '@components/organisms/modals/modal_attendance';
import { ModalIzin } from '@components/organisms/modals/modal_izin';
import { Table } from '@components/molecules/table2';

const styles: { [key: string]: CSSProperties } = {
  root: {}
};

export default function EmployeeKehadiran() {
  const { user } = useAuthContext();
  const { data: attendanceData } = useGetOneAttendance(user?.login_token);

  const tableHeader = [
    { label: 'Tanggal', key: 'createdAt' },
    { label: 'Waktu', key: 'updatedAt' },
    { label: 'Status', key: 'status' },
    { label: 'Jarak Terdekat', key: 'distance' },
    { label: 'Titik Terdekat', key: 'place_name' },
    { label: 'Latitude', key: 'latitude' },
    { label: 'Longitude', key: 'longitude' },
    { label: 'Keterangan', key: 'description' }
  ];

  return (
    <Default title="Kehadiran">
      <div className={'space-y-4'}>
        <div className={'flex space-x-4'}>
          <ModalAttendance />
          <ModalIzin />
        </div>
        <Table data={attendanceData} header={tableHeader} height={500} />
      </div>
    </Default>
  );
}
