import { useEffect } from "react";
import { Stack, SimpleGrid } from "@mantine/core";
import Profile from "../components/Profile";
import Discover from "../components/Discover/Discover";
import Finished from "../components/Finished";
import Bookmarked from "../components/Bookmarked";
import Reading from "../components/Reading";
import { getLayout } from "../components/Layouts/Layout";
import { ReadingChallenge } from "../components/Home/ReadingChallenge";
import { Stats } from "../components/Home/Stats";
import { Hero } from "../components/Home/Hero";

export default function Home({ page, setOpened }) {
  useEffect(() => {
    setOpened(false);
  }, [page, setOpened]);

  if (page === "profile") return <Profile />;
  if (page === "discover") return <Discover />;
  if (page === "finished") return <Finished />;
  if (page === "bookmarked") return <Bookmarked />;
  if (page === "reading") return <Reading />;

  return (
    <Stack>
      <Hero />
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <ReadingChallenge />
        <Stats
          data={[
            { label: "reading", part: 25, color: "blue" },
            { label: "finished", part: 25, color: "teal" },
            { label: "bookmarked", part: 50, color: "gray" },
          ]}
          diff={12}
          total={36}
        />
      </SimpleGrid>
    </Stack>
  );
}

Home.getLayout = getLayout;
