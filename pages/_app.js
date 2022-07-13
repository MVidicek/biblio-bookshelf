import '../styles/globals.css';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { RouteGuard } from '../components/RouteGuard';

export default function App(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const getLayout = Component.getLayout || ((page) => page);

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Biblio</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            loader: 'oval',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position='top-center' limit={5}>
            {/* Add Route Guard */}

            {getLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
