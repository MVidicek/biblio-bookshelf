import { auth, db } from "../firebase.config";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import { ReaderIcon } from "@radix-ui/react-icons";
import formatCategories from "./format-categories";

const setReading = async (book, isReading, setIsReading) => {
  try {
    const user = auth.currentUser;
    if (!isReading) {
      setIsReading(true);
      const docRef = doc(db, "users", user.uid, "reading", book.id);
      await setDoc(docRef, {
        bookId: book.id,
        isbn: book.volumeInfo?.industryIdentifiers[0].identifier,
        etag: book.etag || 0,
        title: book.volumeInfo?.title || "Unknown",
        authors: book.volumeInfo?.authors || ["Unknown"],
        publisher: book.volumeInfo?.publisher || "Unknown",
        publishedDate: book.volumeInfo?.publishedDate || "Unknown",
        description: book.volumeInfo?.description || "Unknown",
        imageLinks:
          book.volumeInfo?.imageLinks?.thumbnail ||
          `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-S.jpg`,
        pageCount: book.volumeInfo?.pageCount || "Unknown",
        averageRating: book.volumeInfo?.averageRating || "Unknown",
        categories: formatCategories(book.volumeInfo?.categories[0]) || [
          "Unknown",
        ],
        createdAt: serverTimestamp(),
      });
      showNotification({
        title: "Reading",
        message: `${book.volumeInfo?.title}`,
        color: "green",
        icon: <ReaderIcon />,
      });
      console.log(docRef);
    } else {
      await deleteDoc(doc(db, "users", user.uid, "reading", book.id));
      setIsReading(false);
      showNotification({
        title: "Removed from Reading",
        message: `${book.volumeInfo?.title}`,
        color: "pink",
        icon: <ReaderIcon />,
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

export default setReading;
