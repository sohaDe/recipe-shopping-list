import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment ={
  production: false,
  firebaseAPIKey: 'AIzaSyDielx5Z-iFuocQfk903gzhaBrwtENKoZE'
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDielx5Z-iFuocQfk903gzhaBrwtENKoZE",
  authDomain: "recipe-shopping-list-f0532.firebaseapp.com",
  databaseURL: "https://recipe-shopping-list-f0532-default-rtdb.firebaseio.com",
  projectId: "recipe-shopping-list-f0532",
  storageBucket: "recipe-shopping-list-f0532.appspot.com",
  messagingSenderId: "37395098922",
  appId: "1:37395098922:web:777f316c9d827f81d3c253",
  measurementId: "G-BDV2DXBTJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
