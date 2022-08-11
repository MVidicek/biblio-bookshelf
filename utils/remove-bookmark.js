import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { showNotification } from "@mantine/notifications";
import { BookmarkIcon } from "@radix-ui/react-icons";

const removeBookmark = async (book) => {
  try {
    const user = auth.currentUser;
    await deleteDoc(doc(db, "users", user.uid, "bookmarked", book.bookId));
    showNotification({
      title: "Removed from Bookmarks",
      message: `${book.title}`,
      color: "pink",
      icon: <BookmarkIcon />,
    });
  } catch (error) {
    showNotification({
      title: "Error",
      message: `Error ${error}`,
      color: "red",
    });
  }
};

export default removeBookmark;
