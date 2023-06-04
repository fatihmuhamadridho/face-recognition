import { Default } from '@components/templates/default';
import { Banner } from '@components/molecules/banner';

export default function AdminDashboard() {
  return (
    <Default title='Dashboard'>
      <Banner
        subTitle="Nikmati kemudahan layanan kami sesuai kebutuhan Anda, pilih dan masuk ke layanan yang tersedia dibawah ini."
        title="Selamat Datang, Superadmin!"
      />
    </Default>
  );
}
