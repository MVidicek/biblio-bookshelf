import React, { useState } from 'react';
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
} from '@mantine/core';
import Lottie from 'lottie-react';
import headerAnimation from '../assets/header-books.json';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

export default function HomeLayout({ children }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
            <Lottie
              animationData={headerAnimation}
              loop={false}
              style={{ width: '64px' }}
              initialSegment={[0, 110]}
            />
            <Text
              size='xl'
              color={
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.colors.teal[4]
              }
              weight={700}
              style={{
                fontFamily: 'Greycliff CF, sans-serif',
                marginTop: '5px',
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
