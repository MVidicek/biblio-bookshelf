import { useState } from "react";
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
import { PersonIcon, CalendarIcon, BookmarkIcon } from "@radix-ui/react-icons";

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ height: 528.8, width: 300, margin: "auto" }}>
      <Card shadow="sm" p="md" withBorder>
        <Card.Section>
          <a
            href={book.volumeInfo?.previewLink}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              p="md"
              fit="contain"
              radius="md"
              withPlaceholder
              src={book.volumeInfo?.imageLinks?.thumbnail}
              height={318}
              alt={book.volumeInfo?.title}
            />
          </a>
        </Card.Section>
        <Text
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
            variant={theme.colorScheme === "dark" ? "outline" : "light"}
            leftSection={<PersonIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo?.authors[0]}
          </Badge>
          <Badge
            color="gray"
            sx={{ paddingLeft: 3 }}
            variant={theme.colorScheme === "dark" ? "outline" : "light"}
            leftSection={<CalendarIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo?.publishedDate?.slice(0, 4)}
          </Badge>
        </Group>

        <Text
          size="xs"
          lineClamp={3}
          style={{ color: secondaryColor, lineHeight: 1.5, marginTop: 10 }}
        >
          {book.searchInfo?.textSnippet}
        </Text>

        <Modal
          opened={opened}
          size="xl"
          onClose={() => setOpened(false)}
          centered
          transition="scale"
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          <BookDetailsModal book={book} />
        </Modal>

        <SimpleGrid cols={2}>
          <Button
            compact
            variant={theme.colorScheme === "dark" ? "outline" : "filled"}
            color="blue"
            style={{ marginTop: 14 }}
            onClick={() => setOpened(true)}
          >
            Details
          </Button>

          <Button
            color="gray"
            style={{ width: 50, marginTop: 14, marginLeft: 100 }}
            variant={theme.colorScheme === "dark" ? "outline" : "filled"}
            compact
            leftIcon={<BookmarkIcon size={14} />}
          ></Button>
        </SimpleGrid>
      </Card>
    </div>
  );
}
