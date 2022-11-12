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
    onSnapshot,
    query,
    where,
    deleteDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

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
let obj = {}
let count = 0;
querySnapshot.forEach((doc) => {
    classes.innerHTML += `
        <option >${doc.data().current_teacher} ${doc.data().batch} ${doc.data().timing} ${doc.data().schedule} ${doc.data().course}</option>
`

    console.log(`${doc.id} => ${doc.data()}`);
});


let addStudent = async () => {
    let studentData = document.querySelectorAll("#v-pills-profile input")
    console.log(studentData)
    let course = document.getElementById("classes")

    for (let i = 0; i < studentData.length; i++) {
        console.log(studentData[i].value)
        if (studentData[i].value.trim() == "") {
            studentData[i].style.border = "1px solid red"
        }
        else {
            obj = {
                studentName: document.getElementById("studentName").value,
                fatherName: document.getElementById("fatherName").value,
                rollNum: document.getElementById("rollNum").value,
                contactNo: document.getElementById("contact").value,
                CNIC: document.getElementById("cnic").value,
                course: course.options[course.selectedIndex].value,
                url: ""
            }
            setTimeout(() => {
                studentData[i].style.border = "1px solid black"
            }, 2000)
            break
        }
    }

    let file = document.querySelector("#studentPic").files[0]
    console.log(file)
    let url = await uploadFiles(file);
    obj.url = url;
    console.log(obj)
    console.log(url)

    const docRef = await addDoc(collection(db, "studentData"), obj);
    swal(`Student Added Successfully`)
    console.log("Document written with ID: ", docRef.id);
    event.preventDefault()

}

const uploadFiles = (file) => {
    event.preventDefault();
    return new Promise((resolve, reject) => {
        const storage = getStorage();

        const storageRef = ref(storage, `student/${obj.CNIC}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

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

let showPreview = () => {
    const q = query(collection(db, "studentData"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        document.getElementById("tableStudent").innerHTML = `
        <tr>
        <th>S.No</th>
        <th>Roll No</th>
        <th>Student Name</th>
        <th>Father Name</th>
        <th>Contact No</th>
        <th>CNIC No</th>
        <th>Course</th>
        <th>Delete</th>
        <th>Edit</th>
        </tr>
`
        count = 0
        querySnapshot.forEach((doc) => {

            document.getElementById("tableStudent").innerHTML += `
             <tr>
                <td>${++count}</td>
                <td>${doc.data().rollNum}</td>
                <td>${doc.data().studentName}</td>
                <td>${doc.data().fatherName}</td>
                <td>${doc.data().contactNo}</td>
                <td>${doc.data().CNIC}</td>
                <td>${doc.data().course}</td>
                <td><button onclick="deleteStudent('${doc.id}')">Delete</button></td>
                <td><button onclick="editStudent('${doc.id}','${doc.data().studentName}','${doc.data().fatherName}','${doc.data().rollNum}','${doc.data().contactNo}','{doc.data().CNIC}','${doc.data().course}')" class="btn-close" data-bs-dismiss="modal" aria-label="Close">>Edit</button></td>
            </tr>
            `
            console.log(doc.id)
        });
    });

}
showPreview()


let deleteStudent = async (document) => {
    await deleteDoc(doc(db, "studentData", document));
    console.log(document)
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

let editStudent = async (document, studentName, fatherName, rollNum, contactNo, CNIC, course) => {
    const updateData = doc(db, "studentData", document);
    console.log(rollNum)
    console.log(document.getElementById("studentNameEdit"))
    document.getElementById("studentNameEdit").value = studentName
    document.getElementById("fatherNameEdit").value = fatherName
    document.getElementById("cnicNumEdit").value = CNIC
    document.getElementById("contactNumEdit").value = contactNo
    document.getElementById("courseEdit").value = course
    await updateDoc(updateData, {
    });
}

window.editStudent = editStudent
window.addClass = addClass;
window.addStudent = addStudent;
window.deleteStudent = deleteStudent


let signoutbtn = document.getElementById('signoutbtn')
signoutbtn.addEventListener("click", () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // window.location = "index.html";
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
})
