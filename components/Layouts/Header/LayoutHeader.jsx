import { Header } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";

// TItles
import TitleHome from "./Titles/TitleHome";
import TitleFinished from "./Titles/TitleFinished";
import TitleReading from "./Titles/TitleReading";
import TitleBookmarks from "./Titles/TitleBookmarks";
import TitleProfile from "./Titles/TitleProfile";

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
    page === "bookmarked"
      ? setBookmarksOpened(true)
      : setBookmarksOpened(false);
    page === "profile" ? setProfileOpened(true) : setProfileOpened(false);
  }, [page]);

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "justify-between",
          height: "100%",
        }}
      >
        <BurgerMenu />
        <Logo />
        {page === "home" && <TitleHome homeOpened={homeOpened} />}
        {page === "discover" && <SearchForm discoverOpened={discoverOpened} />}
        {page === "reading" && <TitleReading readingOpened={readingOpened} />}
        {page === "finished" && (
          <TitleFinished finishedOpened={finishedOpened} />
        )}
        {page === "bookmarked" && (
          <TitleBookmarks bookmarksOpened={bookmarksOpened} />
        )}
        {page === "profile" && <TitleProfile profileOpened={profileOpened} />}
        <ThemeSwitch />
      </div>
    </Header>
  );
}
