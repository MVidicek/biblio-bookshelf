import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  createStyles,
  useMantineTheme,
  TextInput,
  Box,
  Group,
} from '@mantine/core';
import { PasswordStrength } from '../utils/password-strength';

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

function LogIn() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <TextInput placeholder='Email' label='Email' required />

      <PasswordStrength />
      <Group position='center'>
        <Link href='/frontpage'>
          <Button className={classes.button}>Log In</Button>
        </Link>
      </Group>
    </Box>
  );
}

export default LogIn;
