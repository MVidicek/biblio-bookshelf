import { useState } from 'react';
import Head from 'next/head';
import Lottie from 'lottie-react';
import bookAnimation from '../assets/frontpage-books.json';
import {
  Button,
  Modal,
  Group,
  createStyles,
  useMantineTheme,
  Text,
} from '@mantine/core';
import styles from '../styles/Home.module.css';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';

const useStyles = createStyles((theme) => ({
  container: {
    padding: '0 2rem',
  },

  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    color: theme.white,
    backgroundColor: theme.colors.indigo[6],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',
    margin: '1rem 0',

    '&:hover': {
      backgroundColor: theme.colors.indigo[9],
    },

    '&:not(:first-of-type)': {
      backgroundColor: theme.colors.orange[6],

      '&:hover': {
        backgroundColor: theme.colors.orange[9],
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
          className={styles.lottie}
        />

        <Text
          align='center'
          variant='gradient'
          gradient={{ from: 'indigo', to: 'orange', deg: 45 }}
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: '4rem' }}
        >
          Biblio
        </Text>
        <p className={styles.title}> </p>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={'Welcome to Biblio'}
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

      <footer className={styles.footer}>
        <p>Created by Marko Vidiček</p>
      </footer>
    </div>
  );
}
