import {
  Aside,
  Badge,
  MediaQuery,
  useMantineTheme,
  SegmentedControl,
  Switch,
} from "@mantine/core";
import React from "react";

export default function LayoutAside() {
  const theme = useMantineTheme();
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 200 }}>
        <Aside.Section>
          <Badge
            mb="md"
            radius="sm"
            variant="light"
            compact
            color="gray"
            size="md"
            fullWidth
          >
            API
          </Badge>
          <SegmentedControl
            fullWidth
            orientation="vertical"
            data={[
              { label: "Google", value: "google" },
              { label: "Open Library", value: "openLib" },
            ]}
          />
        </Aside.Section>
        <Aside.Section mt={"1rem"}>
          <Badge
            mb="md"
            radius="sm"
            variant="light"
            compact
            color="gray"
            size="md"
            fullWidth
          >
            FILTERS
          </Badge>
          <Switch color="teal" label="Google eBooks" />
        </Aside.Section>
      </Aside>
    </MediaQuery>
  );
}
