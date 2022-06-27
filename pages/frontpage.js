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
} from '@mantine/core';
import Lottie from 'lottie-react';
import headerAnimation from '../assets/header-books.json';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { MainLinks } from '../components/MainLinks';
import { User } from '../components/User';

export default function Frontpage() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
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
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p='md'>
          Application footer
        </Footer>
      }
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
            />
            <Text
              size='xl'
              color='dimmed'
              variant='gradient'
              gradient={{ from: 'cyan', to: 'pink', deg: 45 }}
              weight={700}
              style={{
                fontFamily: 'Greycliff CF, sans-serif',
                marginTop: '5px',
              }}
            >
              BIBLIO
            </Text>
            {theme.colorScheme === 'dark' ? (
              <SunIcon style={{ marginLeft: 'auto', marginRight: '0px' }} />
            ) : (
              <MoonIcon style={{ marginLeft: 'auto', marginRight: '0px' }} />
            )}
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}
