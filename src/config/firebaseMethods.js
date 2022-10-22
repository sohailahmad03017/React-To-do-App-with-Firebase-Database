import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

const auth = getAuth(app);
const db = getDatabase(app);



//Sign Up user with Email and Password
const signUpUser = ({ name, email, password }) => {

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User Successfully Registered
        const user = userCredential.user;
        const userId = user.uid;
        //Sending data in database
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          uid: userId,
        })
          .then(() => { resolve("User Created Successfuly and data is also sent in database") })
          .catch(() => { reject('User created but data is not added in database') });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      })
  })
}

//Login User with Email and Password
const signInUser = ({ email, password }) => {

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        onValue(ref(db, `users/${user.uid}`), (e) => {
          let status = e.exists();
          status ? resolve(e.val()) : reject('Data not Found')
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject("Sign In Failed")
      })
  })
}


//Sending data in database
const sendData = (dataObj, uid) => {
  return new Promise((resolve, reject) => {
    // Create a new post reference with an auto-generated id
    const db = getDatabase();
    const postListRef = ref(db, `notes/${uid}`);
    const newPostRef = push(postListRef);
    set(newPostRef, dataObj)
      .then(() => { resolve('Data Sent') })
      .catch(() => { reject('Sending Failed') })
  })
}




export { signUpUser, signInUser, sendData }