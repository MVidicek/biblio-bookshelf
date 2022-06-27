import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
