import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Skeleton } from '@mantine/core';
import { auth } from '../firebase.config';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return user ? (
    <>
      <Skeleton height={50} circle mb='xl' />
      <Skeleton height={8} radius='xl' />
      <Skeleton height={8} mt={6} radius='xl' />
      <Skeleton height={8} mt={6} width='70%' radius='xl' />
    </>
  ) : (
    <h1>Not Logged In</h1>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
