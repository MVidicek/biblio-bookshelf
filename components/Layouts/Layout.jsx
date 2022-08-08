import React, { useState, useEffect } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  ThemeIcon,
  TextInput,
  Transition,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import {
  SunIcon,
  MoonIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { MainLinks } from "../MainLinks";
import { User } from "../Util/User";
import useGlobalState from "../../hooks/useGlobalState";

function Layout({ children }) {
  const [page, setPage] = useState("home");
  const [opened, setOpened] = useState(false);
  const [discoverOpened, setDiscoverOpened] = useState(false);

  const form = useForm({
    initialValues: { searchText: "" },
  });

  const [search, setSearch] = useGlobalState("search", "");

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (page === "discover") setDiscoverOpened(true);
    else setDiscoverOpened(false);
  }, [page]);

  const handleSearch = async (values) => {
    const { searchText } = values;
    setSearch(searchText);
  };

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
                style={{
                  fontFamily: "Greycliff CF, sans-serif",
                  border: "1px solid",
                  borderColor: theme.colors.teal[4],
                  borderRadius: "5px",
                  padding: "5px",
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
              >
                BIBLIO
              </Text>
            </MediaQuery>
            {page === "discover" ? (
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
                          style={
                            isMobile ? { width: "241px" } : { width: "341px" }
                          }
                        />
                      </form>
                    </div>
                  </div>
                )}
              </Transition>
            ) : null}
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
      }
    >
      <Center>{React.cloneElement(children, { page, setOpened })}</Center>
    </AppShell>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
