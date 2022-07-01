import { useState } from 'react';
import Head from 'next/head';
import Lottie from 'lottie-react';
import bookAnimation from '../assets/header-books.json';
import {
  Button,
  Modal,
  Group,
  createStyles,
  useMantineTheme,
  Text,
} from '@mantine/core';
import LogInLayout from '../components/LogInLayout';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    padding: '0 2rem',
  },

  main: {
    minHeight: '85vh',
    padding: '2rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      [`& .${getRef('child')}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  footer: {
    display: 'flex',
    flex: 1,
    padding: '1rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    color: theme.white,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[7]
        : theme.colors.teal[3],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.teal[4],
    },

    '&:not(:first-of-type)': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[7]
          : theme.colors.cyan[3],

      // pseudo-classes can be nested
      '&:hover': {
        backgroundColor: theme.colors.cyan[4],
      },
    },
  },
}));

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('login');

  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.container}>
      <Head>
        <title>Biblio</title>
        <meta name='description' content='Online Bookshelf' />
        <link rel='icon' href='images/favicon.ico' />
      </Head>

      <main className={classes.main}>
        <Lottie
          animationData={bookAnimation}
          loop={false}
          initialSegment={[0, 110]}
          style={{
            maxWidth: '1024px',
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
            border: '2px solid',
            borderColor: theme.colors.teal[4],
            borderRadius: '50px',
          }}
        />
        <Text
          align='center'
          variant='gradient'
          gradient={
            theme.colorScheme === 'dark'
              ? {
                  from: theme.colors.gray[2],
                  to: theme.colors.gray[2],
                  deg: 45,
                }
              : {
                  from: theme.colors.teal[4],
                  to: theme.colors.blue[3],
                  deg: 45,
                }
          }
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: '4rem' }}
          mt='4rem'
        >
          BIBLIO
        </Text>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          overlayColor={
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          transition='slide-up'
          transitionDuration={400}
          transitionTimingFunction='ease'
        >
          {modalType === 'login' ? <LogIn /> : <SignUp />}
        </Modal>

        <Group position='center'>
          <Button
            onClick={() => {
              setOpened(true);
              setModalType('login');
            }}
            className={classes.button}
          >
            Log In
          </Button>
          <Button
            onClick={() => {
              setOpened(true);
              setModalType('signup');
            }}
            className={classes.button}
          >
            Sign Up
          </Button>
        </Group>
      </main>

      <footer className={classes.footer}>
        <p id='bottom'>Created by Marko Vidiček</p>
      </footer>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <LogInLayout>{page}</LogInLayout>;
};
