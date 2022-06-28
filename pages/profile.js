import Layout from '../components/Layout';
import { Skeleton } from '@mantine/core';

export default function Profile() {
  return (
    <>
      <Skeleton height={50} circle mb='xl' />
      <Skeleton height={8} radius='xl' />
      <Skeleton height={8} mt={6} radius='xl' />
      <Skeleton height={8} mt={6} width='70%' radius='xl' />
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
