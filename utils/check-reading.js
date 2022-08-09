import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { showNotification } from "@mantine/notifications";

const checkIfReading = async (id, setIsReading) => {
  try {
    const user = auth.currentUser;
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "reading")
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().bookId === id) {
        setIsReading(true);
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

export default checkIfReading;
