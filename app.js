import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyB8l2tIT7dmLGJ-A6es7ncCojDMtu4C2Oc",
    authDomain: "assignmentshehzad.firebaseapp.com",
    databaseURL: "https://assignmentshehzad.firebaseio.com",
    projectId: "assignmentshehzad",
    storageBucket: "assignmentshehzad.appspot.com",
    messagingSenderId: "368353736709",
    appId: "1:368353736709:web:6a99f4e3d86c6163c1c46c",
    measurementId: "G-7L08TTZRCN"
};

const app = initializeApp(firebaseConfig);

let viewCredential = () => {
    document.getElementById("credential").innerHTML = `
    <h1>Username: admin@smit.com</h1>
    <h1>password: 123456</h1>`

    document.querySelector("#credential").classList.toggle("hide")
}






window.viewCredential = viewCredential