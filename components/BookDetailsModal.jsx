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
} from "@radix-ui/react-icons";

export default function BookDetailsModal({ book }) {
  const theme = useMantineTheme();

  let categories = ["No Categories"];
  if (book.volumeInfo?.categories) {
    categories = book.volumeInfo?.categories[0]
      .split(" ")
      .filter((c) => c.length > 2);
  }

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
          src={book.volumeInfo?.imageLinks?.thumbnail}
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
        <Stack spacing="md">
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
            {book.volumeInfo?.publishedDate ? " | " : ""}
            {book.volumeInfo?.publishedDate.slice(0, 4)}
          </Text>
          <Text size="sm" weight={200} color="gray">
            Pages: {book.volumeInfo?.pageCount}
          </Text>
          <SimpleGrid cols={categories.length}>
            {categories &&
              categories.map((category) => {
                return (
                  <Badge
                    key={category}
                    radius="sm"
                    color="gray"
                    variant={theme.colorScheme === "dark" ? "light" : "light"}
                  >
                    {category.replace(",", "")}
                  </Badge>
                );
              })}
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
            <Stack mt="lg">
              <Button
                color="blue"
                style={{ width: 150 }}
                variant={theme.colorScheme === "dark" ? "outline" : "filled"}
                compact
                leftIcon={<ReaderIcon size={14} />}
              >
                Add to Reading
              </Button>
              <Button
                color="teal"
                style={{ width: 150 }}
                variant={theme.colorScheme === "dark" ? "outline" : "filled"}
                compact
                leftIcon={<CheckCircledIcon size={14} />}
              >
                Add to Finished
              </Button>
              <Button
                color="gray"
                style={{ width: 150 }}
                variant={theme.colorScheme === "dark" ? "outline" : "filled"}
                compact
                leftIcon={<BookmarkIcon size={14} />}
              >
                Bookmark
              </Button>
            </Stack>
          </Container>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
