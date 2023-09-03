import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCfkO6DEiDFwSH6dyFW_6VjeFlEgWswMLE',
    authDomain: 'crown-clothing-db-e6a73.firebaseapp.com',
    projectId: 'crown-clothing-db-e6a73',
    storageBucket: 'crown-clothing-db-e6a73.appspot.com',
    messagingSenderId: '504440853408',
    appId: '1:504440853408:web:6cec480b5b2cad31ec4ac5'
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userAuth);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef

    //if user data does not exists
    //if user data exists
    //return userDocRef
}