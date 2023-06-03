import '@styles/globals.scss';
import { AppProps } from 'next/app';
import { AuthProvider } from '@components/atoms';
import { QueryClient, QueryClientProvider } from '@libs';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
