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
import { showNotification } from "@mantine/notifications";
import {
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";
import BookDetailsModal from "../components/BookDetailsModal";
import { PersonIcon, CalendarIcon, BookmarkIcon } from "@radix-ui/react-icons";
import useGlobalState from "../hooks/useGlobalState";

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const [reload, setReload] = useState(false);
  const [opened, setOpened] = useState(false);
  const [bookmarkedBooks, setBookmarkedBooks] = useGlobalState(
    "bookmarkedBooks",
    []
  );
  const isBookmarked = bookmarkedBooks
    .map((book) => book.bookId)
    .includes(book.id);

  const user = auth.currentUser;

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  // Setting Bookmarked Books to SWR Cache
  useEffect(() => {
    const getBookmarkedBooks = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "bookmarked")
        );
        const books = [];
        querySnapshot.forEach((doc) => {
          books.push(doc.data());
          //console.log(doc.id, " => ", doc.data());
        });
        setBookmarkedBooks(books);
      } catch (error) {
        showNotification({
          title: "Error",
          message: "Could not fetch bookmarked books",
          color: "pink",
          icon: <Cross1Icon />,
        });
      }
    };
    getBookmarkedBooks();
  }, [reload]);

  const handleBookmark = async () => {
    setReload(!reload);
    try {
      if (!isBookmarked) {
        const docRef = doc(db, "users", user.uid, "bookmarked", book.id);
        await setDoc(docRef, {
          bookId: book.id,
          bookmarkedDate: serverTimestamp(),
        });
        showNotification({
          title: "Bookmarked",
          message: `Bookmarked ${book.volumeInfo?.title}`,
          color: "green",
          icon: <BookmarkIcon />,
        });
        console.log(docRef);
      } else {
        await deleteDoc(doc(db, "users", user.uid, "bookmarked", book.id));
        showNotification({
          title: "Unbookmarked",
          message: `Unbookmarked ${book.volumeInfo?.title}`,
          color: "pink",
          icon: <BookmarkIcon />,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
          <BookDetailsModal book={book} isBookmarked={isBookmarked} />
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
            style={{ width: 50, marginTop: 15, marginLeft: 105 }}
            variant={isBookmarked ? "filled" : "outline"}
            compact
            type="button"
            leftIcon={<BookmarkIcon size={15} />}
            onClick={handleBookmark}
          ></Button>
        </SimpleGrid>
      </Card>
    </div>
  );
}
