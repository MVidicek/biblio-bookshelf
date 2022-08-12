import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
  Center,
} from "@mantine/core";
import { MainLinks } from "./MainLinks";
import { User } from "./User";
import LayoutHeader from "./Header/LayoutHeader";

function Layout({ children }) {
  const [page, setPage] = useState("home");
  const [opened, setOpened] = useState(false);

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
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow mt="md">
            <MainLinks setPage={setPage} />
          </Navbar.Section>
          <Navbar.Section>
            {page !== "profile" ? <User setPage={setPage} /> : null}
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text></Text>
          </Aside>
        </MediaQuery>
      }
      header={
        <LayoutHeader setOpened={setOpened} page={page} opened={opened} />
      }
    >
      <Center>
        {React.cloneElement(children, { page, setOpened, setPage })}
      </Center>
    </AppShell>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
