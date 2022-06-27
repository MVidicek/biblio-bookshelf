import Link from 'next/link';
import {
  Button,
  createStyles,
  useMantineTheme,
  TextInput,
} from '@mantine/core';
import { PasswordStrength } from '../utils/password-strength';

const useStyles = createStyles((theme) => ({
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

function LogIn() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <>
      <TextInput placeholder='Email' label='Email' required />

      <PasswordStrength />
      <Link href='/discover'>
        <Button className={classes.button}>Log In</Button>
      </Link>
    </>
  );
}

export default LogIn;
