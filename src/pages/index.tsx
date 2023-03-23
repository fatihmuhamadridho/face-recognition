import Head from 'next/head';
import { LoginTemplate } from '@components/templates';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <div>
        <LoginTemplate />
      </div>
    </>
  );
}
