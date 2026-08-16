import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

import {
    getFirestore,
    setDoc,
    updateDoc,
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js" // connects to Firebase's database, Firebase stores UID, Email and password, while Firestore holds other info

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAdw2Ip_6r9LVTOnCdcBzHu0YcQQfbBYy8",
    authDomain: "weather-app-project-4f30c.firebaseapp.com",
    projectId: "weather-app-project-4f30c",
    storageBucket: "weather-app-project-4f30c.firebasestorage.app",
    messagingSenderId: "891215169428",
    appId: "1:89121516GE9428:web:1d8d31dd9426afc63c7181",
    measurementId: "G-W99T4QH4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function customAlert(message) {
    const alertBox = document.getElementById("customAlert");

    document.getElementById("alertText").textContent = message;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000); // Hides after 3 seconds
}

const forgotPassword = document.getElementById("forgot-password-word");
// console.log(forgotPassword);
if (forgotPassword) {
    forgotPassword.addEventListener("click", async () => {
        const email = document.getElementById("email-field").value.trim().toLowerCase();

        if (!email) {
            customAlert("Please enter your email first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email); //video: https://www.youtube.com/watch?v=XpMnUNWMyQI
            customAlert("Password reset email sent. Check your inbox. (It may appear in Spam/Trash)");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                customAlert("No account found with this email.");
            } else {
                customAlert("Unable to send reset email.");
                console.log(error);
            }
        }
    });
}

// google stuff
const googleProvider = new GoogleAuthProvider(); // link: https://firebase.google.com/docs/auth/web/google-signin?utm_source

googleProvider.setCustomParameters({
    prompt: "select_account"
});

const googleSignIn = document.getElementById("google-logo");

if (googleSignIn) {
    googleSignIn.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            let firstName = "N/A";
            let lastName = "N/A";

            if (user.displayName) {
                const name = user.displayName.split(" ");
                firstName = name[0];

                if (name[1]) { // Not using last name
                    lastName = name[1];
                }
            }
            
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    firstName: firstName,
                    email: user.email.toLowerCase(),
                    provider: "google",
                });
                
                window.location.href = "index-main-page.html";
            } else {
                await updateDoc(docRef, {
                    provider: "google"
                });
            }

            localStorage.setItem("loggedInUserId", user.uid);
            checkUserInfo(user);
        } catch (error) {
            // console.error(error);
        }
    });
}