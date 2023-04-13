import { Table } from '@components/molecules';
import { styles } from '@libs';
import { Default } from '@components/templates';
import { Button, Text } from '@components/atoms';

export default function AdminKehadiran() {
  return (
    <Default title="Kehadiran">
      <div className={styles('p-5', 'space-y-4')}>
        <Text title="Kehadiran" />
        <div>
          <Button title="Download Data Excel" />
        </div>
        <Table
          columns={[
            { label: '#', value: 'id' },
            { label: 'Username', value: 'pegawai' },
            { label: 'Tanggal Absen', value: 'createdAt' },
            { label: 'Tipe', value: 'Tidak Hadir' },
            { label: 'Status', value: 'Terlambat 1 menit' },
            { label: 'Jarak dengan kantor', value: '100 meter' }
          ]}
          hideAllActions
        />
      </div>
    </Default>
  );
}
