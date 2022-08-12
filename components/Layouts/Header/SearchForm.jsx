import { TextInput, Transition } from "@mantine/core";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import useGlobalState from "../../../functions/hooks/useGlobalState";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";

export default function SearchForm({ discoverOpened }) {
  const [search, setSearch] = useGlobalState("search", "");

  const form = useForm({
    initialValues: { searchText: "" },
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = async (values) => {
    const { searchText } = values;
    setSearch(searchText);
  };

  return (
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
  );
}
