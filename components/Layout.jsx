import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PageContext from '../contexts/PageContext';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  ThemeIcon,
} from '@mantine/core';
import { SunIcon, MoonIcon, BookmarkIcon } from '@radix-ui/react-icons';
import { MainLinks } from './MainLinks';
import { User } from './User';

export default function Layout({ children }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      fixed
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt='md'>
            <PageContext.Provider>
              <MainLinks />
            </PageContext.Provider>
          </Navbar.Section>
          <Navbar.Section>
            {router.pathname !== '/profile' ? <User /> : null}
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
            <Text></Text>
          </Aside>
        </MediaQuery>
      }
      footer={<Footer height={60} p='sm'></Footer>}
      header={
        <Header height={70} p='md'>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>
            <ThemeIcon
              mr='xs'
              size={29}
              color='teal'
              variant={theme.colorScheme === 'dark' ? 'outline' : 'filled'}
            >
              <BookmarkIcon />
            </ThemeIcon>
            <Text
              size='lg'
              color={
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.colors.teal[4]
              }
              weight={400}
              style={{
                fontFamily: 'Greycliff CF, sans-serif',
                border: '1px solid',
                borderColor: theme.colors.teal[4],
                borderRadius: '5px',
                padding: '5px',
                paddingBottom: '0px',
                paddingTop: '0px',
              }}
            >
              BIBLIO
            </Text>
            <ActionIcon
              variant='default'
              onClick={() => toggleColorScheme()}
              size={30}
              style={{ marginLeft: 'auto', marginRight: '0px' }}
            >
              {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <main>{children}</main>
    </AppShell>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
