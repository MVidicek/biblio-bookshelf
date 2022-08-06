import {
  Container,
  SimpleGrid,
  useMantineTheme,
  Image,
  Text,
  Stack,
  ScrollArea,
  Badge,
} from "@mantine/core";

export default function BookDetailsModal({ book }) {
  const theme = useMantineTheme();

  const categories = book.volumeInfo?.categories[0].split(" ");

  return (
    <Container p={0}>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Image
          fit="contain"
          withPlaceholder
          src={book.volumeInfo?.imageLinks?.thumbnail}
          alt={book.volumeInfo?.title}
        />
        <Stack>
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
            {book.volumeInfo?.publishedDate}
          </Text>
          <Text size="sm" weight={200} color="blue">
            Pages: {book.volumeInfo?.pageCount}
          </Text>
          <ScrollArea
            style={{
              height: 100,
              border: "1px solid rgba(0, 200, 255, .1)",
              borderRadius: "5px",
              padding: "5px",
            }}
            type="always"
          >
            <Text size="sm">{book.volumeInfo?.description}</Text>
          </ScrollArea>
          <SimpleGrid cols={categories.length}>
            {categories &&
              categories.map((category) => {
                return (
                  <Badge
                    key={category}
                    color="blue"
                    variant={theme.colorScheme === "dark" ? "outline" : "light"}
                  >
                    {category}
                  </Badge>
                );
              })}
          </SimpleGrid>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
