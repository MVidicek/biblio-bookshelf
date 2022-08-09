import { auth, db } from "../firebase.config";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import { BookmarkIcon } from "@radix-ui/react-icons";

const setBookmark = async (book, isBookmarked, setIsBookmarked) => {
  try {
    const user = auth.currentUser;
    if (!isBookmarked) {
      setIsBookmarked(true);
      const docRef = doc(db, "users", user.uid, "bookmarked", book.id);
      await setDoc(docRef, {
        bookId: book.id,
        isbn: book.volumeInfo?.industryIdentifiers[0].identifier,
        createdAt: serverTimestamp(),
      });
      showNotification({
        title: "Bookmarked",
        message: `${book.volumeInfo?.title}`,
        color: "green",
        icon: <BookmarkIcon />,
      });
      console.log(docRef);
    } else {
      await deleteDoc(doc(db, "users", user.uid, "bookmarked", book.id));
      setIsBookmarked(false);
      showNotification({
        title: "Removed from Bookmarks",
        message: `${book.volumeInfo?.title}`,
        color: "pink",
        icon: <BookmarkIcon />,
      });
    }
  } catch (error) {
    showNotification({
      title: "Error",
      message: `Error ${error}`,
      color: "red",
    });
  }
};

export default setBookmark;
