import React from "react";
import {
  AppShell,
  Header,
  Text,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  ThemeIcon,
} from "@mantine/core";
import { SunIcon, MoonIcon, BookmarkIcon } from "@radix-ui/react-icons";

export default function HomeLayout({ children }) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
              weight={400}
            >
              BIBLIO
            </Text>
            <ActionIcon
              variant="outline"
              color={colorScheme === "dark" ? "yellow" : "dark"}
              onClick={() => toggleColorScheme()}
              style={{ marginLeft: "auto", marginRight: "0px" }}
            >
              {colorScheme === "dark" ? <SunIcon /> : <MoonIcon />}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <main>{children}</main>
    </AppShell>
  );
}
