import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDaGo1gL7ngfUGjbJd3isBjrbqR9olHn9U",
    authDomain: "barterapp-303c6.firebaseapp.com",
    projectId: "barterapp-303c6",
    storageBucket: "barterapp-303c6.appspot.com",
    messagingSenderId: "132046559261",
    appId: "1:132046559261:web:55c9ce0dc1a73221ac4ef4"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();