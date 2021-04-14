import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBp9oyufVbHbVdTcduKF1qxDexXSwJOfRA",
    authDomain: "chatwithme-fd810.firebaseapp.com",
    databaseURL: "https://chatwithme-fd810-default-rtdb.firebaseio.com",
    projectId: "chatwithme-fd810",
    storageBucket: "chatwithme-fd810.appspot.com",
    messagingSenderId: "697883536077",
    appId: "1:697883536077:web:55d825e64ac012d8701784",
    measurementId: "G-NC5NCEX7EB"
  };

  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  
  export const streamMessages = ( observer) => {
    return db.collection('Messages')
        //.doc(Here)
        //.collection('Messages')
        .orderBy('CreatedDateTime')
        .onSnapshot(observer);

        
};
