import React from 'react';
import Link from 'next/link';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { auth } from '../firebase.config';

export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <Link href='/profile'>
        <UnstyledButton
          sx={{
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          }}
        >
          <Group>
            <Avatar
              src='https://cdn-icons-png.flaticon.com/512/560/560216.png'
              radius='xl'
            />
            <Box sx={{ flex: 1 }}>
              <Text size='sm' weight={500}>
                {auth?.currentUser?.displayName}
              </Text>
              <Text color='dimmed' size='xs'>
                {auth?.currentUser?.email}
              </Text>
            </Box>

            {theme.dir === 'ltr' ? (
              <DoubleArrowRightIcon />
            ) : (
              <DoubleArrowLeftIcon />
            )}
          </Group>
        </UnstyledButton>
      </Link>
    </Box>
  );
}
