import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAzrIWcKIv1aKCS1XVaRCXBFuqHvYv6hAc",
    authDomain: "crwn-db-82558.firebaseapp.com",
    databaseURL: "https://crwn-db-82558.firebaseio.com",
    projectId: "crwn-db-82558",
    storageBucket: "crwn-db-82558.appspot.com",
    messagingSenderId: "570230789094",
    appId: "1:570230789094:web:7a78d98f50ba1b6dec3c27",
    measurementId: "G-KTPJH7YF4K"
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    return userRef;
}

export const auth = firebase.auth();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;