import { auth, db } from "../../firebase.config";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";
import {
  BookmarkIcon,
  CheckCircledIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

const setBookCollection = async (
  book,
  isCollection,
  setIsCollection,
  colName
) => {
  if (colName)
    try {
      const user = auth.currentUser;
      let colIcon = <BookmarkIcon />;
      colName === "reading" && (colIcon = <ReaderIcon />);
      colName === "finished" && (colIcon = <CheckCircledIcon />);
      if (!isCollection) {
        setIsCollection(true);
        const docRef = doc(db, "users", user.uid, colName, book.id);
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
          categories: book.volumeInfo?.categories
            ? book.volumeInfo?.categories[0]
            : "/",
          createdAt: serverTimestamp(),
        });
        showNotification({
          title: colName.toUpperCase(),
          message: `${book.volumeInfo?.title}`,
          color: "green",
          icon: colIcon,
        });
        console.log(docRef);
      } else {
        await deleteDoc(doc(db, "users", user.uid, colName, book.id));
        setIsCollection(false);
        showNotification({
          title: `Removed from ${colName.toUpperCase()}`,
          message: `${book.volumeInfo?.title}`,
          color: "pink",
          icon: colIcon,
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

export default setBookCollection;
