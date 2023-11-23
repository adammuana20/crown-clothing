import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

import { WishlistProduct } from '../../components/wishlist/wishlist-button/WishlistButton.component'
import { Category, CategoryItem, ProductItem } from '../../store/categories/Category.types'

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
export const storage = getStorage()

export type ObjectToAdd = {
    title: string;
}

// ADD JSON/JS DATA TO FIRESTORE
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey)

    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done');
}

export const getCategoriesAndDocuments = async (label: string): Promise<Category[]> => {
    const collectionRef = collection(db, label)
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category)
}

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    id?: string;
    createdAt: Date;
    displayName: string;
    email: string;
    roles: string;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation?: AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        const roles = 'customer'

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                roles,
                ...additionalInformation
            })
        } catch (err) {
            console.log('error creating the user', err);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (useAuth) => {
                unSubscribe()
                resolve(useAuth)
            },
            reject
        )
    })
}


//ADD PRODUCT TO FIREBASE
export const uploadImageToStorage = async (image: Blob) => {
    const imgs = ref(storage, `images/${v4()}`)
    const uploadImage = await uploadBytes(imgs, image)
    const imageUrl = await getDownloadURL(uploadImage.ref)

    return imageUrl
}

export const createProductDocumentFromCategory = async ({id, productName, categoryTitle, imageBlob, description, price}: ProductItem) => {
    if(!auth) return

    const categoryDocRef = doc(db, 'categories', categoryTitle);
    const categorySnapshot = await getDoc(categoryDocRef);

    if(categorySnapshot.exists()){
        const categoryData = categorySnapshot.data()

        const itemNames = categoryData.items.map((item: CategoryItem) => item.name)
        if(itemNames.includes(productName)) {
            throw new Error('Product name already exists')
        }
            try {
                const imageUrl = await uploadImageToStorage(imageBlob)

                const newProduct = { id: id, name: productName, imageUrl: imageUrl, description: description, price: price  }
                categoryData.items.push(newProduct)

                return await setDoc(categoryDocRef, categoryData)
            } catch(err) {
                console.log('error creating the Product', err);
            }
    }
}

// ADD WISHLIST TO FIREBASE
export const createWishlistDocumentToUser = async(item: CategoryItem, category: string) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const wishlistDocRef = doc(db, 'wishlists', userID);
    const wishlistSnapshot = await getDoc(wishlistDocRef);

    const createdAt = new Date();
    
    if(!wishlistSnapshot.exists()) {
        try {
            await setDoc(wishlistDocRef, {
                wishlist: [{
                    item,
                    createdAt,
                    category,
                }]
            })
        } catch (err) {
            console.log('error adding to wishlist', err);
        }
    } else {
        const wishlistData = wishlistSnapshot.data()

        const newWishlisth = { item, createdAt, category };
        wishlistData.wishlist.push(newWishlisth)
        
        try {
            await setDoc(wishlistDocRef, wishlistData)
        } catch (err) {
            console.log('error adding to wishlist', err);
        }
    }
}

// REMOVE WISHLISTS
export const removeWishlistItemToUser = async(item: CategoryItem) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return
    
    const { id } = item;

    const wishlistDocRef = doc(db, 'wishlists', userID);
    const wishlistSnapshot = await getDoc(wishlistDocRef);

    if(wishlistSnapshot.exists()) {
        const wishlistData = wishlistSnapshot.data()

        const existingWishlistItem = wishlistData.wishlist.find((wishlistItem: WishlistProduct) => wishlistItem.item.id === id)        

        if(existingWishlistItem) {
            const updatedWishlist = wishlistData.wishlist.filter((wishlistItem: WishlistProduct) => wishlistItem.item.id !== id)
            
            try {
                await setDoc(wishlistDocRef, {
                    wishlist: updatedWishlist
                })                
            } catch(err) {
                console.log('error removing to wishlist', err);
            }
        }
    }
}


// GET USER WISHLISTS
export const getWishlistAndDocuments = async() => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const wishlistDocRef = doc(db, 'wishlists', userID);
    const wishlistSnapshot = await getDoc(wishlistDocRef);

    if(!wishlistSnapshot.exists()) return
    
    return wishlistSnapshot.data().wishlist.map((wishlistItem: WishlistProduct) => wishlistItem)
}