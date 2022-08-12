import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { showNotification } from "@mantine/notifications";
import { Cross2Icon } from "@radix-ui/react-icons";

const removeDocument = async (book, collection) => {
  try {
    const user = auth.currentUser;
    await deleteDoc(doc(db, "users", user.uid, collection, book.bookId));
    showNotification({
      title: "Removed",
      message: `${book.title}`,
      color: "pink",
      icon: <Cross2Icon />,
    });
  } catch (error) {
    showNotification({
      title: "Error",
      message: `Error ${error}`,
      color: "red",
    });
  }
};

export default removeDocument;
