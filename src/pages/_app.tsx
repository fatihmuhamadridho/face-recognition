import '@styles/globals.scss';
import { AppProps } from 'next/app';
import { AuthProvider } from '@components/atoms';
import { QueryClient, QueryClientProvider } from '@libs';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AuthProvider>
          <Notifications position='top-center' />
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
