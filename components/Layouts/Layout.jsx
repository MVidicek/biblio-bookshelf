import React, { useState } from "react";
import { AppShell, useMantineTheme, Center } from "@mantine/core";
import LayoutHeader from "./Header/LayoutHeader";
import LayoutNavbar from "./Navbar/LayoutNavbar";
import LayoutAside from "./Aside/LayoutAside";

function Layout({ children }) {
  const [page, setPage] = useState("home");

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
      navbar={<LayoutNavbar page={page} setPage={setPage} />}
      aside={<LayoutAside />}
      header={<LayoutHeader page={page} />}
    >
      <Center>{React.cloneElement(children, { page, setPage })}</Center>
    </AppShell>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
