import { Header } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";

// TItles
import HeaderTitle from "./HeaderTitle";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "./Logo";
import BurgerMenu from "./BurgerMenu";

export default function LayoutHeader({ page }) {
  const [homeOpened, setHomeOpened] = useState(false);
  const [discoverOpened, setDiscoverOpened] = useState(false);
  const [readingOpened, setReadingOpened] = useState(false);
  const [finishedOpened, setFinishedOpened] = useState(false);
  const [bookmarksOpened, setBookmarksOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);

  useEffect(() => {
    page === "home" ? setHomeOpened(true) : setHomeOpened(false);
    page === "discover" ? setDiscoverOpened(true) : setDiscoverOpened(false);
    page === "reading" ? setReadingOpened(true) : setReadingOpened(false);
    page === "finished" ? setFinishedOpened(true) : setFinishedOpened(false);
    page === "bookmarks" ? setBookmarksOpened(true) : setBookmarksOpened(false);
    page === "profile" ? setProfileOpened(true) : setProfileOpened(false);
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
        {page === "home" && (
          <HeaderTitle transitionOpened={homeOpened} page={page} />
        )}
        {page === "discover" && <SearchForm discoverOpened={discoverOpened} />}
        {page === "reading" && (
          <HeaderTitle transitionOpened={readingOpened} page={page} />
        )}
        {page === "finished" && (
          <HeaderTitle transitionOpened={finishedOpened} page={page} />
        )}
        {page === "bookmarks" && (
          <HeaderTitle transitionOpened={bookmarksOpened} page={page} />
        )}
        {page === "profile" && (
          <HeaderTitle transitionOpened={profileOpened} page={page} />
        )}
        <ThemeSwitch />
      </div>
    </Header>
  );
}
