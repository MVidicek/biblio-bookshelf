import { auth, db } from "../firebase.config";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import { BookmarkIcon } from "@radix-ui/react-icons";
import formatCategories from "./format-categories";

const setBookmark = async (book, isBookmarked, setIsBookmarked) => {
  try {
    const user = auth.currentUser;
    if (!isBookmarked) {
      setIsBookmarked(true);
      const docRef = doc(db, "users", user.uid, "bookmarked", book.id);
      await setDoc(docRef, {
        bookId: book.id,
        isbn: book.volumeInfo?.industryIdentifiers[0].identifier,
        etag: book.etag || 0,
        title: book.volumeInfo?.title || "/",
        authors: book.volumeInfo?.authors || ["/"],
        publisher: book.volumeInfo?.publisher || "/",
        publishedDate: book.volumeInfo?.publishedDate.slice(0, 4) || "/",
        description: book.volumeInfo?.description || "/",
        imageLinks:
          book.volumeInfo?.imageLinks?.thumbnail ||
          `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-S.jpg`,
        pageCount: book.volumeInfo?.pageCount || "/",
        averageRating: book.volumeInfo?.averageRating || "/",
        categories: formatCategories(book.volumeInfo?.categories[0]) || ["/"],
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
