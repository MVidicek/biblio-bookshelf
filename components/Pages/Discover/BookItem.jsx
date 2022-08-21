import { useEffect, useState } from "react";
import {
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
  Badge,
  Button,
  Modal,
  SimpleGrid,
} from "@mantine/core";
import BookDetailsModal from "./BookDetailsModal";
import {
  PersonIcon,
  CalendarIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import setBookmark from "../../../functions/helpers/set-bookmark";
import checkBookCollection from "../../../functions/helpers/check-book-collection";

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  useEffect(() => {
    checkBookCollection(book.id, setIsBookmarked, "bookmarked");
    checkBookCollection(book.id, setIsReading, "reading");
    checkBookCollection(book.id, setIsFinished, "finished");
  }, [isBookmarked, isReading, isFinished]);

  const handleBookmark = () => {
    setBookmark(book, isBookmarked, setIsBookmarked);
  };

  return (
    <div
      style={{
        height: 528.8,
        width: 300,
        margin: "auto",
      }}
    >
      <Card
        shadow="sm"
        p="md"
        withBorder
        radius="md"
        style={{
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        }}
      >
        <Card.Section>
          <a
            href={book.volumeInfo?.previewLink}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              p="md"
              fit="cover"
              radius="sm"
              withPlaceholder
              src={
                book.volumeInfo?.imageLinks?.thumbnail
                  ? book.volumeInfo?.imageLinks?.thumbnail
                  : `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-M.jpg`
              }
              height={328}
              alt={book.volumeInfo?.title}
            />
          </a>
        </Card.Section>
        <Text
          style={{
            marginTop: 25,
            marginBottom: 5,
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          weight={500}
        >
          {book.volumeInfo?.title}
        </Text>
        <Group
          position="center"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Badge
            sx={{ paddingLeft: 3, maxWidth: "50%" }}
            variant="default"
            leftSection={<PersonIcon style={{ paddingTop: 4 }} />}
            radius="sm"
          >
            {book.volumeInfo?.authors[0]}
          </Badge>
          <Badge
            sx={{ paddingLeft: 3 }}
            variant="default"
            leftSection={<CalendarIcon style={{ paddingTop: 4 }} />}
            radius="sm"
          >
            {book.volumeInfo?.publishedDate?.slice(0, 4)}
          </Badge>
        </Group>

        <Text
          size="xs"
          lineClamp={3}
          style={{
            color: secondaryColor,
            lineHeight: 1.5,
            marginTop: 10,
            height: 54,
          }}
        >
          {book.volumeInfo?.description}
        </Text>

        <Modal
          opened={opened}
          size="xl"
          onClose={() => setOpened(false)}
          centered
          transition="scale"
          overlayOpacity={0.55}
          overlayBlur={3}
          ml="md"
          withCloseButton={false}
        >
          <BookDetailsModal
            book={book}
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
            isReading={isReading}
            setIsReading={setIsReading}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
          />
        </Modal>

        <SimpleGrid cols={2}>
          <Button
            compact
            variant={theme.colorScheme === "dark" ? "default" : "filled"}
            color="teal"
            style={{ marginTop: 15, marginLeft: -20, marginRight: 75 }}
            onClick={() => setOpened(true)}
          >
            <Text color="gray.0">Details</Text>
          </Button>

          <Button
            color={isBookmarked ? "grape" : "gray"}
            style={{ width: 50, marginTop: 15, marginLeft: 103 }}
            variant="light"
            compact
            type="button"
            leftIcon={isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            onClick={handleBookmark}
          ></Button>
        </SimpleGrid>
      </Card>
    </div>
  );
}
