import {
  Aside,
  Badge,
  MediaQuery,
  useMantineTheme,
  SegmentedControl,
  Switch,
  Stack,
  Tooltip,
  Divider,
  Radio,
  Slider,
  Accordion,
  Text,
} from "@mantine/core";
import React from "react";

export default function LayoutAside() {
  const theme = useMantineTheme();
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 200 }}>
        <Aside.Section>
          <Divider mb="md" labelPosition="center" label="API" />
          <SegmentedControl
            transitionDuration={300}
            transitionTimingFunction="linear"
            fullWidth
            orientation="vertical"
            data={[
              { label: "Google", value: "google" },
              { label: "Open Library", value: "openLib" },
            ]}
          />
        </Aside.Section>
        <Aside.Section mt="md">
          <Divider mb="md" labelPosition="center" label="QUERY PARAMETERS" />
          <Accordion multiple radius="sm" variant="filled">
            <Accordion.Item value="filter">
              <Accordion.Control>
                <Text size="xs">FILTER</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="xs">
                  Filter search results by volume type and availability.
                </Text>
                <Radio.Group
                  orientation="vertical"
                  spacing="sm"
                  offset="md"
                  size="sm"
                >
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Restrict results to volumes where at least part of the text are previewable."
                  >
                    <Radio
                      color="teal"
                      value="filter-partial"
                      label="Partial"
                    />
                  </Tooltip>
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Restrict results to volumes where all of the text is viewable."
                  >
                    <Radio color="teal" value="filter-full" label="Full" />
                  </Tooltip>
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Restrict results to free Google eBooks"
                  >
                    <Radio
                      color="teal"
                      value="filter-free-ebooks"
                      label="Free eBooks"
                    />
                  </Tooltip>
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Restrict results to Google eBooks, paid or free. Examples of non-eBooks would be publisher content that is available in limited preview and not for sale, or magazines."
                  >
                    <Radio
                      color="teal"
                      value="filter-paid-ebooks"
                      label="Paid eBooks"
                    />
                  </Tooltip>
                </Radio.Group>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="max-results">
              <Accordion.Control>
                <Text size="xs">MAX RESULTS</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="xs">
                  The maximum number of elements to return with this request.
                </Text>
                <Slider
                  my="md"
                  min={1}
                  max={40}
                  defaultValue={10}
                  labelTransition="pop"
                  labelTransitionDuration={150}
                  labelTransitionTimingFunction="ease"
                  color="teal"
                  marks={[
                    { value: 1, label: "0" },
                    { value: 20, label: "20" },
                    { value: 40, label: "40" },
                  ]}
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="order-by">
              <Accordion.Control>
                <Text size="xs">ORDER BY</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="xs">Order of the volume search results.</Text>
                <Radio.Group
                  orientation="vertical"
                  spacing="sm"
                  offset="md"
                  size="sm"
                >
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Returns search results in order of the most relevant to least (this is the default)."
                  >
                    <Radio color="teal" value="relevance" label="Relevance" />
                  </Tooltip>
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Returns search results in order of the newest published date to the oldest."
                  >
                    <Radio color="teal" value="newest" label="Newest" />
                  </Tooltip>
                </Radio.Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Aside.Section>
      </Aside>
    </MediaQuery>
  );
}
