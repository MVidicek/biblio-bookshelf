import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Button, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { auth } from '../firebase.config';

const useStyles = createStyles((theme, _params, getRef) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.cyan[4],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.pink[4],
    },
  },
}));
export default function Profile() {
  const { classes } = useStyles();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
    },
  });

  const onLogout = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <>
      <Button onClick={onLogout} className={classes.button} mt='md'>
        Log Out
      </Button>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
