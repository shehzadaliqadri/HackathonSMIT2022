import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    collection,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxUgfFLuGpK7xTs54jlEXog0CHLTiaUlA",
    authDomain: "test-53443.firebaseapp.com",
    projectId: "test-53443",
    storageBucket: "test-53443.appspot.com",
    messagingSenderId: "502464896815",
    appId: "1:502464896815:web:d1ee2c3229457852a58bda"
};


const app = initializeApp(firebaseConfig),
    auth = getAuth(),
    user = auth.currentUser,
    signoutBtn = document.getElementById("logout"),
    dashboard = document.getElementById("dashboard"),
    db = getFirestore(app);


const querySnapshot = await getDocs(collection(db, "classList"));
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid, "==> user uid")
        console.log(user, "logged in user")
        console.log(user.email, "logged in user")
    } else {
        console.log("user not logged in, redirecting to login/signup page")
        swal("You're Not Signed in, Redirecting to Login Page.")
        setTimeout(() => {
            window.location = "index.html"
        }, 2000);
    }
});

if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
        }).catch((error) => {
            // An error happened.
        });
    })
}
