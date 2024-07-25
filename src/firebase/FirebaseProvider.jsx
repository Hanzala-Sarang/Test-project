// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, set, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALeIb0iiyx_UU6EOfvNQVLjRktgq1gBag",
  authDomain: "test-project-c8f96.firebaseapp.com",
  projectId: "test-project-c8f96",
  storageBucket: "test-project-c8f96.appspot.com",
  databaseURL:
    "https://test-project-c8f96-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "338745268484",
  appId: "1:338745268484:web:92381dbfb11264d8c31851",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

import { createContext, useContext } from "react";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signupUserWithEmailAndPassword = async (email, password) => {
    console.log(email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const setUserData = async (formData) => {
    const userId = currentUser.uid;

    set(ref(database, "users/" + userId), {
      uid: userId,
      name: formData.name,
      email: formData.email,
      description: formData.description,
    });
  };

  const getAllUserData = async () => {
    const usersRef = ref(database, "users/");
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    const usersList = users
      ? Object.keys(users).map((key) => ({
          id: key,
          ...users[key],
        }))
      : [];
    return usersList;
  };

  const getRegistereduser = async () => {
    const userId = currentUser.uid;
    const userRef = ref(database, "users/" + userId);
    const snapshot = await get(userRef);
    const user = snapshot.val();
    return user;
  };
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        setUserData,
        getAllUserData,
        getRegistereduser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
