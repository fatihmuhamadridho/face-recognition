import { styles } from '@libs';
import { Table as TableCore, Button } from '@mantine/core';

const Table = ({ data }: any) => {
  const rows = data?.map((row: any, index: any) => (
    <tr key={index}>
      <td className={styles('w-[50px]')}>{index + 1}</td>
      <td className={styles('w-[300px]')}>{row.createdAt}</td>
      <td>Tidak Hadir</td>
      <td>Terlambat 1 menit</td>
    </tr>
  ));

  return (
    <div className={styles('w-full !overflow-x-scroll')}>
      <TableCore striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal Absen</th>
            <th>Tipe</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className={styles('w-full !overflow-hidden')}>{rows}</tbody>
      </TableCore>
    </div>
  );
};

export default Table;
