import Link from 'next/link';
import {
  Button,
  createStyles,
  useMantineTheme,
  TextInput,
  PasswordInput,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.orange[6],
    border: 0,
    borderRadius: 0,
    padding: `10px 10px`,
    cursor: 'pointer',
    margin: '1rem 0',

    '&:hover': {
      backgroundColor: theme.colors.orange[9],
    },

    '&:not(:first-of-type)': {
      backgroundColor: theme.colors.orange[6],

      '&:hover': {
        backgroundColor: theme.colors.orange[9],
      },
    },
  },
}));

function SignUp() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <>
      <TextInput placeholder='Email' label='Email' required />
      <PasswordInput
        placeholder='Password'
        label='Password'
        description='Password must include at least one letter, number and special character'
        required
      />
      <Link href='/discover'>
        <Button className={classes.button}>Sign Up</Button>
      </Link>
    </>
  );
}

export default SignUp;
