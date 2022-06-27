import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import Navbar from '../components/Navbar';

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
      <Navbar />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
