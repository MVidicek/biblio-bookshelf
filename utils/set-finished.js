import { auth, db } from "../firebase.config";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const setFinished = async (book, isFinished, setIsFinished) => {
  try {
    const user = auth.currentUser;
    if (!isFinished) {
      setIsFinished(true);
      const docRef = doc(db, "users", user.uid, "finished", book.id);
      await setDoc(docRef, {
        bookId: book.id,
        isbn: book.volumeInfo?.industryIdentifiers[0].identifier,
        etag: book.etag || "",
        title: book.volumeInfo?.title || "/",
        authors: book.volumeInfo?.authors || ["/"],
        publisher: book.volumeInfo?.publisher || "/",
        publishedDate: book.volumeInfo?.publishedDate.slice(0, 4) || "/",
        language: book.volumeInfo?.language || "/",
        description: book.volumeInfo?.description || "/",
        imageLinks:
          book.volumeInfo?.imageLinks?.thumbnail ||
          `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-S.jpg`,
        pageCount: book.volumeInfo?.pageCount || "/",
        averageRating: book.volumeInfo?.averageRating || "/",
        categories: book.volumeInfo?.categories[0] || "/",
        createdAt: serverTimestamp(),
      });
      showNotification({
        title: "Finished",
        message: `${book.volumeInfo?.title}`,
        color: "green",
        icon: <CheckCircledIcon />,
      });
      console.log(docRef);
    } else {
      await deleteDoc(doc(db, "users", user.uid, "finished", book.id));
      setIsFinished(false);
      showNotification({
        title: "Removed from Finished",
        message: `${book.volumeInfo?.title}`,
        color: "pink",
        icon: <CheckCircledIcon />,
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

export default setFinished;
