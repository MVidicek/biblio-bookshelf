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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.black,
    backgroundColor: theme.colors.gray[1],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.gray[4],
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
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        router.push('/profile');
      }
    } catch (error) {
      console.error(error);
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
      </form>
      <Group position='center' m='1rem'>
        <Button type='submit' className={classes.button}>
          Log In
        </Button>
      </Group>
    </Box>
  );
}

export default LogIn;
