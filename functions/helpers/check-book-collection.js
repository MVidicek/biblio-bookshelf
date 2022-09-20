import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import { showNotification } from '@mantine/notifications';

const checkBookCollection = async (id, setCollection, colName) => {
	try {
		const user = auth.currentUser;
		const querySnapshot = await getDocs(
			collection(db, 'users', user.uid, colName),
		);
		querySnapshot.forEach((doc) => {
			if (doc.data().bookId === id) {
				setCollection(true);
			}
		});
	} catch (error) {
		showNotification({
			title: 'Error',
			message: `Error ${error}`,
			color: 'pink',
		});
	}
};

export default checkBookCollection;
