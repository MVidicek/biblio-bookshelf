import '../styles/globals.css';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState('light');
  const getLayout = Component.getLayout || ((page) => page);
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
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
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
