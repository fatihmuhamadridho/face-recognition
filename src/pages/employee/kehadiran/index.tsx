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

  const renderBalitbang1 = (values: any) => {
    const distance = values?.distance?.find(
      (data: any) => data?.place_name === 'balitbang1'
    );
    console.log({ distance });
    return <div>{Math.floor(distance?.distance)}m</div>;
  };

  const renderBalitbang2 = (values: any) => {
    const distance = values?.distance?.find(
      (data: any) => data?.place_name === 'balitbang2'
    );
    console.log({ distance });
    return <div>{Math.floor(distance?.distance)}m</div>;
  };

  const renderJarakTerdekat = (values: any) => {
    const lowestRangeItem = values?.distance?.reduce((prev: any, curr: any) =>
      Number(prev.distance) < Number(curr.distance) ? prev : curr
    );
    return (
      <div>
        {Math.floor(lowestRangeItem.distance)}m ({lowestRangeItem.place_name})
      </div>
    );
  };

  const tableHeader = [
    { label: 'Tanggal', key: 'createdAt' },
    { label: 'Waktu', key: 'updatedAt' },
    { label: 'Status', key: 'status' },
    { label: 'Balitbang1', key: renderBalitbang1 },
    { label: 'Balitbang2', key: renderBalitbang2 },
    { label: 'Jarak Terdekat', key: renderJarakTerdekat },
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
