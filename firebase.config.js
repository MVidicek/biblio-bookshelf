// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCECXSVENahF_69L2HGUbmRFNO9CVIvp3Q',
  authDomain: 'biblio-bookstore.firebaseapp.com',
  projectId: 'biblio-bookstore',
  storageBucket: 'biblio-bookstore.appspot.com',
  messagingSenderId: '504991180773',
  appId: '1:504991180773:web:6fa1836602ba1a2cd9310c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
