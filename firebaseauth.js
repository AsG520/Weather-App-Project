import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js"

import {
    getFirestore,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js"

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
const analytics = getAnalytics(app);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000)
}

const signUp = document.getElementById("sign-up");

if (signUp) {
    signUp.addEventListener("click", (event) => {
        event.preventDefault();

        const email = document.getElementById("email-address-field").value;
        const password = document.getElementById("email-password-field").value;
        const firstName = document.getElementById("first-name-field").value;

        const auth = getAuth();
        const db = getFirestore();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: email,
                    firstName: firstName,
                    password: password
                };

                showMessage("Account created sucessfully.", "signUpMessage");
                const docRef = doc(db, "users", user.uid);
                setDoc(docRef, userData)
                    .then(() => {
                        window.location.href = "index.html";
                    })
                    .catch((error) => {
                        console.error("error writing document", error);
                    });
            })

            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === 'auth/email-already-in-use') {
                    showMessage("Email address already exists.", "signUpMessage");
				} else if (errorCode === "auth/invalid-email") {
					showMessage("Incorrect email address.", "signUpMessage");
				} else if (errorCode === "auth/missing-password") {
					showMessage("Please enter your password.", "signUpMessage");
				} else if (errorCode === "auth/wrong-password") {
                    showMessage("Incorrect password.", "signInMessage");
				} else if (errorCode === "auth/invalid-credential") {
					showMessage("Invalid account details.", "signInMessage");
				} else if (errorCode === "auth/too-many-requests") {
					showMessage("Please try again later.", "signInMessage");
				} else {
                    showMessage(error.message, "signInMessage");
                }
            })
    })
}

const signIn = document.getElementById("login");

if (signIn) {
    signIn.addEventListener("click", (event) => {
        event.preventDefault();

        const email = document.getElementById("email-field").value;
        const password = document.getElementById("password-field").value;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                showMessage("Login is successful.", "signInMessage");
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = "index-main-page.html";
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === "auth/wrong-password") {
                    showMessage("Incorrect password.", "signInMessage");
                } else if (errorCode === "auth/user-not-found") {
                    showMessage("Account does not exist.", "signInMessage");
				} else if (errorCode === "auth/invalid-email") {
					showMessage("Incorrect email address.", "signInMessage");
				} else if (errorCode === "auth/missing-password") {
					showMessage("Please enter your password.", "signInMessage");
				} else if (errorCode === "auth/too-many-requests") {
					showMessage("Please try again later.", "signInMessage");
				} else if (errorCode === "auth/invalid-credential") {
					showMessage("Invalid account details.", "signInMessage");
				} else {
                    showMessage(error.message, "signInMessage");
                }
            })
    })
}