import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteSwitch from './RouteSwitch';
import { initializeApp } from "firebase/app";


const root = ReactDOM.createRoot(document.getElementById("root"));
const firebaseConfig = {
  apiKey: "AIzaSyBGYP-cKd5ltNbfhtSa3niVwhZz_7Y9-xM",
  authDomain: "wheres-waldo-e5022.firebaseapp.com",
  projectId: "wheres-waldo-e5022",
  storageBucket: "wheres-waldo-e5022.appspot.com",
  messagingSenderId: "534137488052",
  appId: "1:534137488052:web:73b97c0a7dffb4addecde1",
};
initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
