import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { showNotification } from "@mantine/notifications";

const user = auth.currentUser;

const checkIfBookmarked = async (book, setIsBookmarked) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "bookmarked")
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().bookId === book.id) {
        setIsBookmarked(true);
      }
    });
  } catch (error) {
    showNotification({
      title: "Error",
      message: "Could not fetch bookmarked books",
      color: "pink",
    });
  }
};

export default checkIfBookmarked;
