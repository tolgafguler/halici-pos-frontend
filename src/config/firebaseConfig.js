import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  
    apiKey: "AIzaSyDNZ3CizgC0r5rxO9VjrVNXZfWNrouAFpE",
    authDomain: "halicipos-deneme.firebaseapp.com",
    databaseURL: "https://halicipos-deneme.firebaseio.com",
    projectId: "halicipos-deneme",
    storageBucket: "halicipos-deneme.appspot.com",
    messagingSenderId: "358078014230",
    appId: "1:358078014230:web:0dda9e501ec3f811baa637"
};

// var firebaseConfig = {
//   apiKey: "AIzaSyBWyD1AXmSfmv7eVQ_hMICNK_r32VMqBls",
//   authDomain: "uploadcusto.firebaseapp.com",
//   databaseURL: "https://uploadcusto.firebaseio.com",
//   projectId: "uploadcusto",
//   storageBucket: "uploadcusto.appspot.com",
//   messagingSenderId: "230229894263",
//   appId: "1:230229894263:web:9f6443d308733e17429272"
// };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  firebase.firestore();
  export default firebase;