import Link from 'next/link';
import {
  Button,
  createStyles,
  TextInput,
  Box,
  Group,
  PasswordInput,
} from '@mantine/core';

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

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <TextInput mb='1rem' placeholder='Email' label='Email' required />

      <PasswordInput
        placeholder='Password'
        label='Password'
        description='Password must include at least one letter, number and special character'
        required
      />
      <Group position='center' m='1rem'>
        <Link href='/profile'>
          <Button className={classes.button}>Log In</Button>
        </Link>
      </Group>
    </Box>
  );
}

export default LogIn;
