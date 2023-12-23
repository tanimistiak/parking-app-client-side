// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRUBZNldgK5b6Hnrp0bqXMH5DZGRaYr2k",
  authDomain: "parking-management-ed2e7.firebaseapp.com",
  projectId: "parking-management-ed2e7",
  storageBucket: "parking-management-ed2e7.appspot.com",
  messagingSenderId: "928679093932",
  appId: "1:928679093932:web:15d066214135134fca6109",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(app);
export default firebaseStorage;
