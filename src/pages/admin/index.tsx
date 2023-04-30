import { Default } from '@components/templates';
import { Text } from '@mantine/core';

export default function AdminDashboard() {
  return (
    <Default title="User">
      <div>
        <Text>Selamat Datang, superadmin</Text>
      </div>
    </Default>
  );
}
