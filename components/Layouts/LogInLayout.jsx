import React from "react";
import {
  AppShell,
  Header,
  Text,
  useMantineTheme,
  ThemeIcon,
} from "@mantine/core";
import { BookmarkIcon } from "@radix-ui/react-icons";
import ThemeSwitch from "./Header/ThemeSwitch";

export default function HomeLayout({ children }) {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <ThemeIcon
              mr="xs"
              size={29}
              color="teal"
              variant={theme.colorScheme === "dark" ? "outline" : "filled"}
            >
              <BookmarkIcon />
            </ThemeIcon>
            <Text
              size="lg"
              color={
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.colors.teal[4]
              }
              weight={500}
            >
              BIBLIO
            </Text>
            <ThemeSwitch />
          </div>
        </Header>
      }
    >
      <main>{children}</main>
    </AppShell>
  );
}
