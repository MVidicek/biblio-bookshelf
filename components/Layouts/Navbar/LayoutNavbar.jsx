import useGlobalState from "../../../functions/hooks/useGlobalState";
import React, { useEffect } from "react";
import { Navbar } from "@mantine/core";
import { MainLinks } from "./MainLinks";
import { User } from "./User";

export default function LayoutNavbar({ page, setPage }) {
  const [opened, setOpened] = useGlobalState("burger", false);

  useEffect(() => {
    setOpened(false);
  }, [page]);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 200 }}
    >
      <Navbar.Section grow mt="md">
        <MainLinks setPage={setPage} />
      </Navbar.Section>
      <Navbar.Section>
        <User setPage={setPage} />
      </Navbar.Section>
    </Navbar>
  );
}
