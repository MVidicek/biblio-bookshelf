import {
  Container,
  SimpleGrid,
  useMantineTheme,
  Image,
  Text,
  Stack,
  ScrollArea,
  Badge,
  Button,
} from "@mantine/core";
import {
  ReaderIcon,
  CheckCircledIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import setBookmark from "../../../functions/helpers/set-bookmark";
import setReading from "../../../functions/helpers/set-reading";
import setFinished from "../../../functions/helpers/set-finished";

export default function BookDetailsModal({
  book,
  isBookmarked,
  setIsBookmarked,
  isReading,
  setIsReading,
  isFinished,
  setIsFinished,
}) {
  const theme = useMantineTheme();

  const handleBookmark = () => {
    setBookmark(book, isBookmarked, setIsBookmarked);
  };

  const handleReading = () => {
    setReading(book, isReading, setIsReading);
  };

  const handleFinished = () => {
    setFinished(book, isFinished, setIsFinished);
  };

  return (
    <Container p={0}>
      <SimpleGrid
        spacing="xl"
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Image
          fit="cover"
          withPlaceholder
          height={520}
          radius="sm"
          sx={{
            "@media (max-width: 768px)": {
              display: "none",
              width: 250,
              justifySelf: "center",
            },
          }}
          src={
            book.volumeInfo?.imageLinks?.thumbnail
              ? book.volumeInfo?.imageLinks?.thumbnail
              : `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}.jpg`
          }
          alt={book.volumeInfo?.title}
        />
        <Image
          fit="cover"
          withPlaceholder
          radius="sm"
          sx={{
            display: "none",
            "@media (max-width: 768px)": {
              display: "block",
              width: 200,
              justifySelf: "center",
            },
          }}
          src={book.volumeInfo?.imageLinks?.thumbnail}
          alt={book.volumeInfo?.title}
        />
        <Stack spacing="md" height={520}>
          <Text transform="uppercase" size="xl" weight={700} color="teal">
            {book.volumeInfo?.title}
          </Text>
          <Text size="lg" weight={600} color="blue">
            {book.volumeInfo?.authors[0]}
            {book.volumeInfo?.authors.length > 1 ? " | " : ""}
            {book.volumeInfo?.authors[1]}
          </Text>
          <Text size="md" weight={200} color="gray">
            {book.volumeInfo?.publisher}
            {book.volumeInfo?.publishedDate && book.volumeInfo?.publisher
              ? " | "
              : ""}
            {book.volumeInfo?.publishedDate?.slice(0, 4)}
          </Text>
          <Text size="sm" weight={200} color="gray">
            Pages: {book.volumeInfo?.pageCount}
            {book.volumeInfo?.ratingsCount ? " | Ratings: " : ""}
            {book.volumeInfo?.ratingsCount}
          </Text>
          <Badge variant="dot" radius="sm">
            Average Rating : {book.volumeInfo?.averageRating ?? "Unknown"}
          </Badge>
          <SimpleGrid cols={1}>
            <Badge
              radius="sm"
              color="gray"
              variant={theme.colorScheme === "dark" ? "light" : "light"}
            >
              {book.volumeInfo?.categories || "No Categories"}
            </Badge>
          </SimpleGrid>
          <ScrollArea
            style={{
              height: 150,
              border: "1px solid rgba(255, 255, 255, .1)",
              borderRadius: "5px",
              padding: "10px",
            }}
            type="always"
          >
            <Text size="sm">{book.volumeInfo?.description}</Text>
          </ScrollArea>
          <Container p={0}>
            <Stack>
              <Button
                color="blue"
                style={{ width: 150 }}
                variant={isReading ? "light" : "outline"}
                compact
                leftIcon={<ReaderIcon size={14} />}
                onClick={handleReading}
              >
                {isReading ? "Reading" : "Add to Reading"}
              </Button>
              <Button
                color="teal"
                style={{ width: 150 }}
                variant={isFinished ? "light" : "outline"}
                compact
                leftIcon={<CheckCircledIcon size={14} />}
                onClick={handleFinished}
              >
                {isFinished ? "Finished" : "Add to Finished"}
              </Button>
              <Button
                color={isBookmarked ? "grape" : "gray"}
                style={{ width: 150 }}
                variant={isBookmarked ? "light" : "outline"}
                compact
                leftIcon={
                  isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />
                }
                onClick={handleBookmark}
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </Stack>
          </Container>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
