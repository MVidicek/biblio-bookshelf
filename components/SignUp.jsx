import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { Button, createStyles, TextInput, Box, Group } from '@mantine/core';
import { PasswordStrength } from '../utils/password-strength';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
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

function SignUp() {
  const { classes } = useStyles();

  const [password, setPassword] = useState('');
  const form = useForm({
    initialValues: { name: '', email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
    },
  });

  const router = useRouter();

  const handleSubmit = async (values) => {
    const { name, email } = values;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, { displayName: name });

      const formData = { ...values };
      formData.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formData);
      toast.success('Signed up successfully 🎉');
      router.push('/profile');
    } catch (error) {
      toast.error('Something went wrong ⚠️');
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group mb='1rem'>
          <TextInput
            {...form.getInputProps('name')}
            placeholder='Full Name'
            label='Name'
            required
          />
        </Group>
        <TextInput
          {...form.getInputProps('email')}
          mb='1rem'
          placeholder='Email'
          label='Email'
          required
        />
        <PasswordStrength password={password} setPassword={setPassword} />

        <Group position='center' m='1rem'>
          <Button type='submit' className={classes.button}>
            Sign Up
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default SignUp;
