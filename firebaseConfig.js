// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBvJBBy4ru0mmL7lP7PKQ6WQyYOwyhklzA",
  authDomain: "task-flow-d5463.firebaseapp.com",
  databaseURL: "https://task-flow-d5463-default-rtdb.firebaseio.com",
  projectId: "task-flow-d5463",
  storageBucket: "task-flow-d5463.appspot.com",
  messagingSenderId: "567264124383",
  appId: "1:567264124383:web:051a9b42ab850e3dd5786a",
  measurementId: "G-JW80HB4R71"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };


