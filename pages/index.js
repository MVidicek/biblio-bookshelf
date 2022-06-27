import Head from 'next/head';
import Lottie from 'lottie-react';
import bookAnimation from '../assets/frontpage-books.json';
import { Button } from '@mantine/core';
import styles from '../styles/Home.module.css';
import { createStyles } from '@mantine/core';

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
    borderRadius: 0,
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
  const { classes } = useStyles();

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
        <p className={styles.title}> Biblio</p>
        <div>
          <Button className={classes.button}>Log In</Button>
          <Button className={classes.button}>Register</Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Created by Marko Vidiček</p>
      </footer>
    </div>
  );
}
