import { styles } from '@libs';
import { Table } from '@components/molecules';
import { Button, Text } from '@components/atoms';
import { useGetListUsers } from 'services/userService';
import { Default } from '@components/templates';

export default function AdminDashboard() {
  const { data: userData } = useGetListUsers();

  console.log(userData);

  return (
    <Default title="User">
      <div className={styles('p-5', 'space-y-4')}>
        <Text title="List User" />
        <Button title="Tambah User" />
        <Table data={userData} />
      </div>
    </Default>
  );
}
