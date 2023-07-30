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

  const tableHeader = [
    { label: 'Username', key: 'username' },
    { label: 'Tanggal Absensi', key: 'createdAt' },
    { label: 'Waktu Absensi', key: 'updatedAt' },
    { label: 'Status', key: 'status' },
    { label: 'Jarak terdekat', key: 'distance' },
    { label: 'Titik terdekat', key: 'place_name' },
    { label: 'Latitude', key: 'latitude' },
    { label: 'Longitude', key: 'longitude' },
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
