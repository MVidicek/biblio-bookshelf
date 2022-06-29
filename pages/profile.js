import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import {
  Button,
  createStyles,
  TextInput,
  Badge,
  Stack,
  Avatar,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { showNotification } from '@mantine/notifications';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { PersonIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';

const useStyles = createStyles((theme, _params, getRef) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.teal[5],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.teal[6],
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

  const avatar = (
    <Avatar
      alt='Avatar for badge'
      size={24}
      mr={5}
      src='https://cdn-icons-png.flaticon.com/512/560/560216.png'
    />
  );

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
        spacing='md'
        align='center'
        justify='center'
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
        })}
      >
        <Badge
          sx={{ paddingLeft: 0 }}
          size='lg'
          radius='sm'
          leftSection={avatar}
          variant='gradient'
          gradient={{ from: 'teal', to: 'cyan', deg: 60 }}
        >
          {form.values.name}
        </Badge>
        <TextInput
          icon={<PersonIcon />}
          placeholder={form.values.name}
          label='Name'
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSection={
            <Badge variant='outline' color='teal'>
              Name
            </Badge>
          }
        />
        <TextInput
          icon={<EnvelopeClosedIcon />}
          placeholder={form.values.email}
          label='Email'
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSection={
            <Badge variant='outline' color='teal'>
              Email
            </Badge>
          }
        />

        <Button mt='1rem' onClick={onLogout} className={classes.button}>
          Log Out
        </Button>
      </Stack>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
