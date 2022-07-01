import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import {
  Button,
  createStyles,
  TextInput,
  Box,
  Group,
  PasswordInput,
} from '@mantine/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import OAuth from './OAuth';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.gray[5],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.teal[4],
    },
  },
}));

function LogIn() {
  const { classes } = useStyles();
  const router = useRouter();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        router.push('/home');
        showNotification({
          title: 'Welcome',
          message: 'You have successfully logged in',
          color: 'teal',
          icon: <CheckIcon />,
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Invalid email or password',
        color: 'pink',
        icon: <Cross1Icon />,
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mb='1rem'
          placeholder='Email'
          label='Email'
          required
          {...form.getInputProps('email')}
        />

        <PasswordInput
          placeholder='Password'
          label='Password'
          description='Password must include at least one letter, number and special character'
          required
          {...form.getInputProps('password')}
        />

        <Group position='center' m='1rem'>
          <Button type='submit' className={classes.button}>
            Log In
          </Button>{' '}
          <OAuth></OAuth>
        </Group>
      </form>
    </Box>
  );
}

export default LogIn;
