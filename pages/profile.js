import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Button, createStyles, Input, Badge, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { showNotification } from '@mantine/notifications';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { PersonIcon } from '@radix-ui/react-icons';

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
  const [changeDetails, setChangeDetails] = useState(false);

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
    showNotification({
      title: 'Logged out',
      message: 'You have been logged out',
      color: 'yellow',
      icon: <InfoCircledIcon />,
    });
  };

  return (
    <>
      <Stack
        spacing='lg'
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
        })}
      >
        <Input
          icon={<PersonIcon />}
          placeholder='Full Name'
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSection={
            <Badge color='pink' variant='filled'>
              Name
            </Badge>
          }
        />
        <Input
          icon={<PersonIcon />}
          placeholder='Email'
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSection={
            <Badge color='pink' variant='filled'>
              Email
            </Badge>
          }
        />

        <Button onClick={onLogout} className={classes.button}>
          Log Out
        </Button>
      </Stack>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
