import { Stack, SimpleGrid } from "@mantine/core";
import Profile from "../components/Pages/Profile/Profile";
import Discover from "../components/Pages/Discover/Discover";
import Finished from "../components/Pages/Finished/Finished";
import Bookmarked from "../components/Pages/Bookmarked/Bookmarked";
import Reading from "../components/Pages/Reading/Reading";
import { getLayout } from "../components/Layouts/Layout";
import { ReadingChallenge } from "../components/Home/ReadingChallenge";
import { Stats } from "../components/Home/Stats";
import { Hero } from "../components/Home/Hero";

export default function Home({ page, setPage }) {
  if (page === "profile") return <Profile />;
  if (page === "discover") return <Discover />;
  if (page === "finished") return <Finished />;
  if (page === "bookmarked") return <Bookmarked setPage={setPage} />;
  if (page === "reading") return <Reading />;

  return (
    <Stack>
      <Hero />
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <ReadingChallenge />
        <Stats
          data={[
            { label: "finished", part: 25, color: "teal" },
            { label: "reading", part: 25, color: "cyan" },
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
