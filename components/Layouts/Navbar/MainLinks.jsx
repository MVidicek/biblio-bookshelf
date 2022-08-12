import React from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ReaderIcon,
  CheckCircledIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

function MainLink({ icon, color, label, setPage }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.gray[8]
              : theme.colors.teal[0],
        },
      })}
      onClick={() => setPage(label.toLowerCase())}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <HomeIcon />, color: "violet", label: "Home" },
  { icon: <MagnifyingGlassIcon />, color: "cyan", label: "Discover" },
  { icon: <ReaderIcon />, color: "blue", label: "Reading" },
  { icon: <CheckCircledIcon />, color: "teal", label: "Finished" },
  { icon: <BookmarkIcon />, color: "grape", label: "Bookmarked" },
];

export function MainLinks({ setPage }) {
  const links = data.map((link) => (
    <MainLink setPage={setPage} {...link} key={link.label} />
  ));
  return <div>{links}</div>;
}
