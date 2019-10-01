import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdp4iyD2QZ7pyLeDAT06yV7Eh7NuaW62w",
    authDomain: "job-portal-mern.firebaseapp.com",
    databaseURL: "https://job-portal-mern.firebaseio.com",
    projectId: "job-portal-mern",
    storageBucket: "",
    messagingSenderId: "1059294496677",
    appId: "1:1059294496677:web:8f2951e5bfac0912b88a4c",
    measurementId: "G-5Z6X48CDQB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;