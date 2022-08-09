import { auth, db } from "../firebase.config";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import { ReaderIcon } from "@radix-ui/react-icons";

const setReading = async (book, isReading, setIsReading) => {
  try {
    const user = auth.currentUser;
    if (!isReading) {
      setIsReading(true);
      const docRef = doc(db, "users", user.uid, "reading", book.id);
      await setDoc(docRef, {
        bookId: book.id,
        isbn: book.volumeInfo?.industryIdentifiers[0].identifier,
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
