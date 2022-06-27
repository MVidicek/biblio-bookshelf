import Link from 'next/link';
import {
  Button,
  createStyles,
  useMantineTheme,
  TextInput,
  PasswordInput,
  Box,
  Group,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.black,
    backgroundColor: theme.colors.gray[1],
    border: 0,
    borderRadius: 5,
    padding: `10px 10px`,
    cursor: 'pointer',
    margin: '1rem 0',

    '&:hover': {
      backgroundColor: theme.colors.gray[4],
    },
  },
}));

function SignUp() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <TextInput placeholder='Email' label='Email' required />
      <PasswordInput
        placeholder='Password'
        label='Password'
        description='Password must include at least one letter, number and special character'
        required
      />
      <Group position='center'>
        <Link href='/profile'>
          <Button className={classes.button}>Sign Up</Button>
        </Link>
      </Group>
    </Box>
  );
}

export default SignUp;
