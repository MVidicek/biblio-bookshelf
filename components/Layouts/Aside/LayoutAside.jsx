import {
  Aside,
  Badge,
  MediaQuery,
  useMantineTheme,
  SegmentedControl,
  Tooltip,
  Divider,
  Radio,
  Slider,
  Accordion,
  Text,
  Input,
  Stack,
  Button,
} from "@mantine/core";
import {
  MagnifyingGlassIcon,
  BarChartIcon,
  StackIcon,
  GlobeIcon,
  FileIcon,
  FontStyleIcon,
} from "@radix-ui/react-icons";
import ReactFlagsSelect from "react-flags-select";
import React, { useState } from "react";

export default function LayoutAside() {
  const [language, setLanguage] = useState("en");
  const theme = useMantineTheme();
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 200 }}>
        <Aside.Section>
          <Badge mb="md" fullWidth variant="light" radius="sm" color="gray">
            SEARCH SETTINGS
          </Badge>
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
              <Accordion.Control icon={<MagnifyingGlassIcon />}>
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
              <Accordion.Control icon={<BarChartIcon />}>
                <Text size="xs">RESULTS</Text>
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
              <Accordion.Control icon={<StackIcon />}>
                <Text size="xs">ORDER BY</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="xs">Order of the volume search results.</Text>
                <Radio.Group
                  orientation="vertical"
                  spacing="sm"
                  offset="md"
                  size="sm"
                  defaultValue="relevance"
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

            <Accordion.Item value="print-type">
              <Accordion.Control icon={<FileIcon />}>
                <Text size="xs">PRINT TYPE</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="xs">Restrict to books or magazines.</Text>
                <Radio.Group
                  orientation="vertical"
                  spacing="sm"
                  offset="md"
                  size="sm"
                  defaultValue="type-all"
                >
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Return all volume content types (no restriction). This is the default."
                  >
                    <Radio color="teal" value="type-all" label="All" />
                  </Tooltip>
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Return just books."
                  >
                    <Radio color="teal" value="type-books" label="Books" />
                  </Tooltip>
                  <Tooltip
                    transition="pop"
                    transitionDuration={300}
                    multiline
                    width={220}
                    label="Return just magazines."
                  >
                    <Radio
                      color="teal"
                      value="type-magazines"
                      label="Magazines"
                    />
                  </Tooltip>
                </Radio.Group>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="language">
              <Accordion.Control icon={<GlobeIcon />}>
                <Text size="xs">LANGUAGE</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text mb="md" size="xs">
                  Restricts the volumes returned to those that are tagged with
                  the specified language.
                </Text>
                <ReactFlagsSelect
                  selectedSize={12}
                  optionsSize={14}
                  searchable
                  selected={language}
                  onSelect={(code) => setLanguage(code)}
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="query-string">
              <Accordion.Control icon={<FontStyleIcon />}>
                <Text size="xs">QUERY</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text mb="sm" size="xs">
                  Full-text query string.
                </Text>
                <Stack>
                  <Input size="xs" placeholder="Title" />
                  <Input size="xs" placeholder="Publisher" />
                  <Input size="xs" placeholder="Author" />
                  <Input size="xs" placeholder="Subject" />
                  <Input size="xs" placeholder="ISBN" />
                  <Button
                    size="xs"
                    compact
                    color="teal"
                    variant={theme.colorScheme === "dark" ? "light" : "filled"}
                  >
                    <Text>Save Queries</Text>
                  </Button>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Aside.Section>
      </Aside>
    </MediaQuery>
  );
}
