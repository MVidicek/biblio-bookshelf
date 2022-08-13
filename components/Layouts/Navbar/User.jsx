import React from "react";
import {
  UnstyledButton,
  Group,
  Text,
  Box,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import { auth } from "../../../firebase.config";

export function User({ setPage }) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
        onClick={() => setPage("profile")}
      >
        <Group>
          <Box sx={{ flex: 1 }}>
            <Badge
              mb="md"
              radius="sm"
              variant="dot"
              compact
              size="md"
              color="teal"
            >
              Logged In
            </Badge>
            <Text size="sm" weight={500}>
              {auth?.currentUser?.displayName}
            </Text>
            <Text color="dimmed" size="xs">
              {auth?.currentUser?.email}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
}
