import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { showNotification } from "@mantine/notifications";

const checkIfFinished = async (id, setIsFinished) => {
  try {
    const user = auth.currentUser;
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "finished")
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().bookId === id) {
        setIsFinished(true);
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

export default checkIfFinished;
