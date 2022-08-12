import {
  ActionIcon,
  Badge,
  Burger,
  Header,
  MediaQuery,
  Text,
  TextInput,
  ThemeIcon,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  BookmarkIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import useGlobalState from "../../../hooks/useGlobalState";
import { useMediaQuery } from "@mantine/hooks";

export default function LayoutHeader({ opened, setOpened, page }) {
  const [discoverOpened, setDiscoverOpened] = useState(false);
  const [bookmarksOpened, setBookmarksOpened] = useState(false);

  const form = useForm({
    initialValues: { searchText: "" },
  });

  const [search, setSearch] = useGlobalState("search", "");

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    page === "discover" ? setDiscoverOpened(true) : setDiscoverOpened(false);
    page === "bookmarked"
      ? setBookmarksOpened(true)
      : setBookmarksOpened(false);
  }, [page]);

  const handleSearch = async (values) => {
    const { searchText } = values;
    setSearch(searchText);
  };

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <ThemeIcon
            mr="xs"
            size={29}
            color="teal"
            variant={theme.colorScheme === "dark" ? "outline" : "filled"}
          >
            <BookmarkIcon />
          </ThemeIcon>
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
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
        </MediaQuery>
        {page === "discover" && (
          <Transition
            mounted={discoverOpened}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <div
                style={
                  isMobile
                    ? { marginLeft: "auto", marginRight: "30px" }
                    : { marginLeft: "auto", marginRight: "80px" }
                }
              >
                <div style={styles}>
                  <form onSubmit={form.onSubmit(handleSearch)}>
                    <TextInput
                      icon={<MagnifyingGlassIcon />}
                      placeholder={search ? search : "Search..."}
                      type="search"
                      {...form.getInputProps("searchText")}
                      size="sm"
                      style={isMobile ? { width: "241px" } : { width: "341px" }}
                    />
                  </form>
                </div>
              </div>
            )}
          </Transition>
        )}
        {page === "bookmarked" && (
          <Transition
            mounted={bookmarksOpened}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <div
                style={
                  isMobile
                    ? { marginLeft: "auto", marginRight: "30px" }
                    : { marginLeft: "auto", marginRight: "80px" }
                }
              >
                <div style={styles}>
                  <Badge color="grape" radius="sm" size="xl" variant="outline">
                    <Text
                      size="xl"
                      weight={200}
                      color={
                        colorScheme === "dark"
                          ? theme.colors.gray[0]
                          : theme.colors.gray[8]
                      }
                    >
                      Bookmarks
                    </Text>
                  </Badge>
                </div>
              </div>
            )}
          </Transition>
        )}
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
  );
}
