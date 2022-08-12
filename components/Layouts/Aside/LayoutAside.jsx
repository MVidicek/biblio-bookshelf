import { Aside, MediaQuery, Text } from "@mantine/core";
import React from "react";

export default function LayoutAside() {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        <Text></Text>
      </Aside>
    </MediaQuery>
  );
}
