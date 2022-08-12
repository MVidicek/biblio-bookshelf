import { Burger, MediaQuery } from "@mantine/core";
import React from "react";
import useGlobalState from "../../../functions/hooks/useGlobalState";

export default function BurgerMenu() {
  const [opened, setOpened] = useGlobalState("burger", false);

  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size="sm"
        color="#868E96"
        mr="xl"
      />
    </MediaQuery>
  );
}
