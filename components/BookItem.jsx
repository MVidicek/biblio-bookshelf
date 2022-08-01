import { useState } from "react";
import {
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
  Badge,
  Button,
  ActionIcon,
  Grid,
  Modal,
} from "@mantine/core";
import { PersonIcon, CalendarIcon, BookmarkIcon } from "@radix-ui/react-icons";

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 300, margin: "auto" }}>
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
            {book.volumeInfo?.publishedDate.slice(0, 4)}
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
          onClose={() => setOpened(false)}
          title="Book Details"
          centered
          transition="scale"
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          {/*TODO Modal content */}
        </Modal>

        <Grid columns={5}>
          <Grid.Col span={4}>
            <Button
              variant={theme.colorScheme === "dark" ? "outline" : "filled"}
              color="teal"
              style={{ marginTop: 14 }}
              onClick={() => setOpened(true)}
            >
              Details
            </Button>
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon
              color="gray"
              variant={theme.colorScheme === "dark" ? "outline" : "default"}
              size={36}
              style={{ marginTop: 14 }}
            >
              <BookmarkIcon />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
}
