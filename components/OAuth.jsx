import { useRouter } from 'next/router';
import { auth, db } from '../firebase.config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import googleIcon from '../assets/googleIcon.svg';
import { Button } from '@mantine/core';
import { Cross1Icon, CheckIcon } from '@radix-ui/react-icons';

export default function OAuth() {
  const router = useRouter();

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      router.push('/profile');
      showNotification({
        title: 'Welcome',
        message: 'You have successfully logged in',
        color: 'teal',
        icon: <CheckIcon />,
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Could not authorize with Google',
        color: 'red',
        icon: <Cross1Icon />,
      });
    }
  };

  return (
    <div>
      <Button onClick={onGoogleClick}>With Google</Button>
    </div>
  );
}
