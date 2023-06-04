import { Table } from '@components/molecules/table2';
import { Default } from '@components/templates';
import { Button, Input, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useGetAllAttendance } from 'services/attendanceService';

export default function AdminKehadiran() {
  const { data: attendanceData } = useGetAllAttendance();
  console.log(attendanceData);

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
    { label: 'Username', key: 'username' },
    { label: 'Tanggal Absensi', key: 'createdAt' },
    { label: 'Waktu Absensi', key: 'createdAt' },
    { label: 'Tipe', key: 'username' },
    { label: 'Status', key: 'username' },
    { label: 'Jarak dengan kantor', key: 'username' },
    { label: 'Actions', key: renderActions },
  ];

  return (
    <Default title="Kehadiran">
      <div className="flex justify-between">
        <Input icon={<IconSearch size={16} />} />
        <Button variant="default">Download Data Excel</Button>
      </div>
      <div className="mt-4">
        <Table data={attendanceData} header={tableHeader} />
      </div>
    </Default>
  );
}
