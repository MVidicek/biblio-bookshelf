import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { showNotification } from "@mantine/notifications";

const checkIfBookmarked = async (id, setIsBookmarked) => {
  try {
    const user = auth.currentUser;
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "bookmarked")
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().bookId === id) {
        setIsBookmarked(true);
      }
    });
  } catch (error) {
    showNotification({
      title: "Error",
      message: `Error ${error}`,
      color: "pink",
    });
  }
};

export default checkIfBookmarked;
