import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase.config";

export default async function fetchDocuments(collectionName = "") {
  const user = auth.currentUser;

  const q = query(collection(db, "users", user.uid, collectionName));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error("No documents found");
  }
  return querySnapshot.docs.map((doc) => doc.data());
}
