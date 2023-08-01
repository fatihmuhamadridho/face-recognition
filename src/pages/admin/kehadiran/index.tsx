import { Table } from '@components/molecules/table2';
import { Default } from '@components/templates';
import { Button, Input, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import downloadExcel from 'libs/downloadExcel';
import { useState } from 'react';
import { useGetAllAttendance } from 'services/attendanceService';

export default function AdminKehadiran() {
  const { data: attendanceData } = useGetAllAttendance();
  const [searchInput, setSearchInput] = useState<string>('');

  const renderBalitbang1 = (values: any) => {
    const distance = values?.distance?.find((data: any) => data?.name === 'balitbang1');
    console.log({ distance });
    return <div>{distance?.range} m</div>;
  };

  const renderBalitbang2 = (values: any) => {
    const distance = values?.distance?.find((data: any) => data?.name === 'balitbang2');
    console.log({ distance });
    return <div>{distance?.range} m</div>;
  };

  const renderJarakTerdekat = (values: any) => {
    const lowestRangeItem = values?.distance?.reduce((prev: any, curr: any) =>
      Number(prev.range) < Number(curr.range) ? prev : curr
    );
    return (
      <div>
        {lowestRangeItem.range} m ({lowestRangeItem.name})
      </div>
    );
  };

  const tableHeader = [
    { label: 'Username', key: 'username' },
    { label: 'Tanggal Absensi', key: 'createdAt' },
    { label: 'Waktu Absensi', key: 'updatedAt' },
    { label: 'Status', key: 'status' },
    { label: 'Balitbang1', key: renderBalitbang1 },
    { label: 'Balitbang2', key: renderBalitbang2 },
    { label: 'Jarak Terdekat', key: renderJarakTerdekat },
    { label: "Keterangan", key: "description" }
  ];

  const handleDownloadExcel = async () => {
    try {
      await downloadExcel(
        attendanceData.map((data: any, index: number) => {
          return {
            no: index + 1,
            username: data.username,
            tanggal_absensi: data.createdAt,
            waktu_absensi: data.createdAt,
            status: data.status,
            jarak_terdekat: data.distance,
            titik_terdekat: data.place_name,
            keterangan: data.description
          };
        }),
        'data-absensi.xlsx'
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Default title="Kehadiran">
      <div className="flex justify-between">
        <Input
          icon={<IconSearch size={16} />}
          onChange={(e: any) => setSearchInput(e.target.value)}
          placeholder="Cari username"
          value={searchInput}
        />
        <Button onClick={handleDownloadExcel} variant="default">
          Download Data Excel
        </Button>
      </div>
      <div className="mt-4">
        <Table
          data={attendanceData?.filter((val: any) => {
            if (
              searchInput !== ''
            ) {
              if (String(val.username).toLowerCase().includes(searchInput.toLowerCase())) {
                return val
              } else {
                return null
              }
            }

            return val;
          })}
          header={tableHeader}
          height={550}
        />
      </div>
    </Default>
  );
}
