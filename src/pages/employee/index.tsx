import { Default } from '@components/templates';
import { styles } from '@libs';
import { Text } from '@mantine/core';

export default function EmployeeDashboard() {
  return (
    <Default title="Dashboard">
      <div
        className={styles(
          'p-4 m-4 h-[120px]',
          'bg-[#344293] text-white',
          'rounded-lg'
        )}>
        <Text size={24}>Selamat Datang, superadmin</Text>
      </div>
    </Default>
  );
}
