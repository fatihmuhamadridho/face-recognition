import { Default } from '@components/templates/default';
import { Banner } from '@components/molecules/banner';
import { useAuthContext } from '@components/atoms';

export default function EmployeeDashboard() {
  const { user } = useAuthContext();

  return (
    <Default title='Dashboard'>
      <Banner
        subTitle="Nikmati kemudahan layanan kami sesuai kebutuhan Anda, pilih dan masuk ke layanan yang tersedia dibawah ini."
        title={`Selamat Datang, ${user?.username}!`}
      />
    </Default>
  );
}
