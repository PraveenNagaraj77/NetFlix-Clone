// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzaCAFxYx59C_ZVOnB02eI9ReuJ_yprz8",
  authDomain: "netflixclone-8c55e.firebaseapp.com",
  projectId: "netflixclone-8c55e",
  storageBucket: "netflixclone-8c55e.appspot.com",
  messagingSenderId: "757803642733",
  appId: "1:757803642733:web:003d75fe7d322f4327b464",
  measurementId: "G-6PEXCT7VWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth , email , password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
        toast.success("Signed Up Successfully.")
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



const login = async(email , password)=>{
    try {
         await signInWithEmailAndPassword(auth,email,password)
         
         toast.success("Logged in Successfully.")
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
    toast.info("Logged out Successfully.")
}

export {auth,db,login,signup,logout};