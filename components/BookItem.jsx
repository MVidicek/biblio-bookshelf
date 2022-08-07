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
import BookDetailsModal from "../components/BookDetailsModal";
import {
  PersonIcon,
  CalendarIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import setBookmark from "../utils/set-bookmark";
import checkIfBookmarked from "../utils/check-bookmarked";

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  // Check if book is bookmarked
  useEffect(() => {
    checkIfBookmarked(book, setIsBookmarked);
  }, [isBookmarked]);

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
      <Card shadow="sm" p="md" withBorder>
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
              src={book.volumeInfo?.imageLinks?.thumbnail}
              height={318}
              alt={book.volumeInfo?.title}
            />
          </a>
        </Card.Section>
        <Text
          color="teal"
          style={{
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
            color="blue"
            sx={{ paddingLeft: 3, maxWidth: "50%" }}
            variant=""
            leftSection={<PersonIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo?.authors[0]}
          </Badge>
          <Badge
            color="blue"
            sx={{ paddingLeft: 3 }}
            variant=""
            leftSection={<CalendarIcon style={{ paddingTop: 4 }} />}
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
          />
        </Modal>

        <SimpleGrid cols={2}>
          <Button
            compact
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            color="teal"
            style={{ marginTop: 15, marginLeft: -20, marginRight: 75 }}
            onClick={() => setOpened(true)}
          >
            Details
          </Button>

          <Button
            color={isBookmarked ? "grape" : "gray"}
            style={{ width: 50, marginTop: 15, marginLeft: 103 }}
            variant={isBookmarked ? "filled" : "outline"}
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
