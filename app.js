import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

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
    loginBtn = document.getElementById("signinBtn"),
    loginEmail = document.getElementById("signinEmail"),
    loginPassword = document.getElementById("signinPassword");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user, "==> user logged in")
                swal("Hello world!");
                setTimeout(() => {
                    window.location = "dashboard.html"
                }, 2000);
            })
            .catch((error) => {
                console.log(error, "==> found error with login")
            });
    })
}



let viewCredential = () => {
    document.getElementById("credential").innerHTML = `
    <h1>Username: admin@smit.com</h1>
    <h1>password: 123456</h1>`

    document.querySelector("#credential").classList.toggle("hide")
}

let login = () => {

}


window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid, "this user logged in, redirecting to dashboard in 5 seconds")
            swal("User Logged in, Redirecting to dashboard page");
            setTimeout(() => {
                window.location = "dashboard.html"
            }, 1000);
        } else {
        }
    });
}



window.viewCredential = viewCredential