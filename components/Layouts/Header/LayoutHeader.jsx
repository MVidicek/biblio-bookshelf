import { Header } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import BookmarksTitle from "./BookmarksTitle";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "./Logo";
import BurgerMenu from "./BurgerMenu";

export default function LayoutHeader({ page }) {
  const [discoverOpened, setDiscoverOpened] = useState(false);
  const [bookmarksOpened, setBookmarksOpened] = useState(false);

  useEffect(() => {
    page === "discover" ? setDiscoverOpened(true) : setDiscoverOpened(false);
    page === "bookmarked"
      ? setBookmarksOpened(true)
      : setBookmarksOpened(false);
  }, [page]);

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <BurgerMenu />
        <Logo />
        {page === "discover" && <SearchForm discoverOpened={discoverOpened} />}
        {page === "bookmarked" && (
          <BookmarksTitle bookmarksOpened={bookmarksOpened} />
        )}
        <ThemeSwitch />
      </div>
    </Header>
  );
}
