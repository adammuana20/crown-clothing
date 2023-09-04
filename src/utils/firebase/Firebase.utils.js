import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
import { async } from 'q'

const firebaseConfig = {
    apiKey: 'AIzaSyCfkO6DEiDFwSH6dyFW_6VjeFlEgWswMLE',
    authDomain: 'crown-clothing-db-e6a73.firebaseapp.com',
    projectId: 'crown-clothing-db-e6a73',
    storageBucket: 'crown-clothing-db-e6a73.appspot.com',
    messagingSenderId: '504440853408',
    appId: '1:504440853408:web:6cec480b5b2cad31ec4ac5'
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
}