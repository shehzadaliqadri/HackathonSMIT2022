import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    addDoc,
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
let classes = document.getElementById("classes")
classes.innerHTML = `
<option value="0" disabled selected>Open this select menu</option>
`
querySnapshot.forEach((doc) => {
    classes.innerHTML += `
        <option>${doc.data().current_teacher} ${doc.data().batch} ${doc.data().timing} ${doc.data().schedule} ${doc.data().course}</option>
`
    console.log(`${doc.id} => ${doc.data()}`);
});


let addStudent = async () => {
    let studentData = document.querySelectorAll("#v-pills-profile input")
    console.log(studentData)
    for (let i = 0; i < studentData.length; i++) {
        console.log(studentData[i])

    }

    if (studentData[0].trim() && studentData[1].trim() && studentData[2].trim() && studentData[3].trim() && studentData[4].trim() && studentData[5].trim()) {
        console.log("hi")
    }
    studentData.forEach(async element => {
        console.log("hi")
        const docRef = await addDoc(collection(db, "classList"), {
            timing: result1,
            schedule: result2,
            current_teacher: result3,
            section: result4,
            course: result5,
            batch: result5
        });
        swal(`Class Added Successfully`)
        console.log("Document written with ID: ", docRef.id);
    })
}

let addClass = async () => {
    // console.log(event.target)
    let dropdown1 = document.getElementById("timing")
    let result1 = dropdown1.options[dropdown1.selectedIndex].value;
    console.log(result1)

    let dropdown2 = document.getElementById("schedule")
    let result2 = dropdown2.options[dropdown2.selectedIndex].value;
    // console.log(result2)

    let dropdown3 = document.getElementById("teacher")
    let result3 = dropdown3.options[dropdown3.selectedIndex].value;
    // console.log(result3)

    let dropdown4 = document.getElementById("section")
    let result4 = dropdown4.options[dropdown4.selectedIndex].value;
    // console.log(result4)

    let dropdown5 = document.getElementById("batch")
    let result5 = dropdown5.options[dropdown5.selectedIndex].value;

    let dropdown6 = document.getElementById("batch")
    let result6 = dropdown6.options[dropdown6.selectedIndex].value;
    // console.log(result5)

    if (result1 != 0 && result2 != 0 && result3 != 0 && result4 != 0 && result5 != 0 && result6 != 0) {
        //  && dropdown2 != "0" && dropdown3 != "0" && dropdown4 != "0" && dropdown5 != "0") {
        console.log("hi")
        const docRef = await addDoc(collection(db, "classList"), {
            timing: result1,
            schedule: result2,
            current_teacher: result3,
            section: result4,
            course: result5,
            batch: result5
        });
        swal(`Class Added Successfully`)
        console.log("Document written with ID: ", docRef.id);
    }
}

let attendance = () => {
}




//if logout goto login page
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
            console.log("signout")
        }).catch((error) => {
            swal(`Error In Sign out: ${error}`,)
        });
    })
}





window.addClass = addClass;
window.addStudent = addStudent;