import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA5iGhjZ04BYpfyP4Lauk-RbpGPrvRivHw",
  authDomain: "shoot-the-breeze-93d19.firebaseapp.com",
  databaseURL: "https://shoot-the-breeze-93d19.firebaseio.com",
  storageBucket: "shoot-the-breeze-93d19.appspot.com",
  messagingSenderId: "1069020550733"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
