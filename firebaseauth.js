  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAdw2Ip_6r9LVTOnCdcBzHu0YcQQfbBYy8",
    authDomain: "weather-app-project-4f30c.firebaseapp.com",
    projectId: "weather-app-project-4f30c",
    storageBucket: "weather-app-project-4f30c.firebasestorage.app",
    messagingSenderId: "891215169428",
    appId: "1:891215169428:web:1d8d31dd9426afc63c7181",
    measurementId: "G-GEW99T4QH4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);