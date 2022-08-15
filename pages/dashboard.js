import { Stack, SimpleGrid } from "@mantine/core";
import Profile from "../components/Pages/Profile/Profile";
import Discover from "../components/Pages/Discover/Discover";
import Finished from "../components/Pages/Finished/Finished";
import Bookmarked from "../components/Pages/Bookmarked/Bookmarked";
import Reading from "../components/Pages/Reading/Reading";
import { getLayout } from "../components/Layouts/Layout";
import { ReadingChallenge } from "../components/Pages/Home/ReadingChallenge";
import { Stats } from "../components/Pages/Home/Stats";
import { Hero } from "../components/Pages/Home/Hero";

export default function Dashboard({ page, setPage }) {
  if (page === "profile") return <Profile />;
  if (page === "discover") return <Discover />;
  if (page === "finished") return <Finished setPage={setPage} />;
  if (page === "bookmarks") return <Bookmarked setPage={setPage} />;
  if (page === "reading") return <Reading setPage={setPage} />;

  return (
    <Stack>
      <Hero />
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 1100, cols: 1 }]}>
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

Dashboard.getLayout = getLayout;
