import { Table } from '@components/molecules';
import { styles } from '@libs';
import { Default } from '@components/templates';
import { Text } from '@components/atoms';

export default function AdminKehadiran() {
  return (
    <Default title="Kehadiran">
      <div className={styles('p-5', 'space-y-4')}>
        <Text title="Kehadiran" />
        <Table />
      </div>
    </Default>
  );
}
