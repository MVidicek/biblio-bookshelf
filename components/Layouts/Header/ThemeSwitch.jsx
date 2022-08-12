import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import React from "react";

export default function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === "dark" ? "yellow" : "dark"}
      onClick={() => toggleColorScheme()}
      style={{ marginLeft: "auto", marginRight: "0px" }}
    >
      {colorScheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </ActionIcon>
  );
}
