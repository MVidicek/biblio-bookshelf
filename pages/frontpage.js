import React, { useState } from 'react';
import Link from 'next/link';
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
import { MainLinks } from '../components/MainLinks';
import { User } from '../components/User';
import Profile from '../components/Profile';
import Discover from '../components/Discover';

export default function Frontpage() {
  const [opened, setOpened] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');
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
              initialSegment={[0, 110]}
            />
            <Text
              size='xl'
              variant='gradient'
              gradient={{
                from: theme.colors.cyan[4],
                to: theme.colors.pink[3],
                deg: 45,
              }}
              weight={700}
              style={{
                fontFamily: 'Greycliff CF, sans-serif',
                marginTop: '5px',
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
      {activeComponent === 'profile' && <Profile />}
    </AppShell>
  );
}
