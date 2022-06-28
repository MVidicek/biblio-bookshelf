import React from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ReaderIcon,
  CheckCircledIcon,
  BookmarkIcon,
} from '@radix-ui/react-icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

function MainLink({ icon, color, label }) {
  const navigate = `/${label.toLowerCase()}`;
  return (
    <Link href={navigate}>
      <UnstyledButton
        sx={(theme) => ({
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
        })}
      >
        <Group>
          <ThemeIcon color={color} variant='light'>
            {icon}
          </ThemeIcon>

          <Text size='sm'>{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  { icon: <MagnifyingGlassIcon />, color: 'blue', label: 'Discover' },
  { icon: <ReaderIcon />, color: 'teal', label: 'Reading' },
  { icon: <CheckCircledIcon />, color: 'violet', label: 'Finished' },
  { icon: <BookmarkIcon />, color: 'grape', label: 'Bookmarked' },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
