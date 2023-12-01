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
    User,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
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
    QueryDocumentSnapshot,
    updateDoc,
} from 'firebase/firestore'

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 } from 'uuid'

import { WishlistProduct } from '../../components/wishlist/wishlist-button/WishlistButton.component'
import { Category, CategoryItem } from '../../store/categories/Category.types'
import { CartItem } from '../../store/cart/Cart.types'
import { Order } from '../../store/orders/Orders.types'

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
    imageUrl: string;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation?: AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        const roles = ['customer']
        const imageUrl = ''

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                roles,
                imageUrl,
                ...additionalInformation
            })
        } catch (err) {
            throw new Error('Error creating the user');
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const updateUserProfileFromDocument = async (displayName: string, email: string, imageFile: string, selectedIamge: string)=> {
    const userID = auth.currentUser?.uid;

    if(!userID) {
        throw new Error('No user is currently signed in');
    }   

    const userDocRef = doc(db, 'users', userID)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) return

    try {
        if(selectedIamge) {
            const imageUrl = await uploadImageToStorage(imageFile)
            
            await updateDoc(userDocRef, {
                displayName,
                email,
                imageUrl,
            })
        } else {
            await updateDoc(userDocRef, {
                displayName,
                email,
            })
        }
    } catch(error) {
        throw new Error('Failed to update Info!', error as Error)
    }
}

export const updateUserPasswordFromDocument = async (oldPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    
    if(!user) {
        throw new Error('No user is currently signed in');
    }

    try {
        if(user.email) {
            const credential = EmailAuthProvider.credential(user.email, oldPassword)

            await reauthenticateWithCredential(user, credential)
            await updatePassword(user, newPassword)
        }
    } catch(error) {
        throw new Error('Failed updating password!', error as Error)
    }
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return
    
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const getAuthUserProviderID = async () => {
    if(!auth) return
    const providerId = auth.currentUser?.providerData[0]?.providerId || null;

    return providerId
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

export const getUpdatedUserInfo = async() => {
    const userID = auth.currentUser?.uid;
    if(!userID) return 

    const userDocRef = doc(db, 'users', userID)
    const userSnapshot = await getDoc(userDocRef)

    return userSnapshot as QueryDocumentSnapshot<UserData>
}


//ADD PRODUCT TO FIREBASE
export const uploadImageToStorage = async (image: string) => {
    const imgs = ref(storage, `images/${v4()}`)
    
    try {

    const blob = new Blob([image], { type: 'image/jpeg' });
    const uploadImage = await uploadBytesResumable(imgs, blob)
    
    const imageUrl = await getDownloadURL(uploadImage.ref)

    return imageUrl
    } catch(err) {
        console.log('Error', err);
        
    }
}

export const createProductDocumentFromCategory = async (product: CategoryItem, categoryTitle: string) => {
    if(!auth) return

    const categoryDocRef = doc(db, 'categories', categoryTitle);
    const categorySnapshot = await getDoc(categoryDocRef);

    if(categorySnapshot.exists()){
        const categoryData = categorySnapshot.data()

        const itemNames = categoryData.items.map((item: CategoryItem) => item.name)
        if(itemNames.includes(product.name)) {
            throw new Error('Product name already exists')
        }
            try {
                const imageUrl = await uploadImageToStorage(product.imageUrl)

                const newProduct = { id: product.id, name: product.name, imageUrl: imageUrl, description: product.description, price: product.price  }
                categoryData.items.push(newProduct)

                await setDoc(categoryDocRef, categoryData)
                return true;
            } catch(err) {
                throw new Error('Error creating the Product. Please try again!');
            }
    }
}

// ADD WISHLIST TO FIREBASE
export const createWishlistDocumentToUser = async(item: CategoryItem, category: string) => {
    const userID = auth.currentUser?.uid;

    if(!userID) throw new Error('You must log in first!')

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
            throw new Error('Error adding to wishlist. Please try again')
        }
    } else {
        try {
            const wishlistData = wishlistSnapshot.data()

            const { id } = item;

            const existingWishlistItem = wishlistData.wishlist.find((wishlistItem: WishlistProduct) => wishlistItem.item.id === id)

            if(existingWishlistItem) {
                throw new Error('Product already in wishlist')
            }

            const newWishlist = { item, createdAt, category };
            wishlistData.wishlist.push(newWishlist)
            await setDoc(wishlistDocRef, wishlistData)
        } catch (err) {
            throw new Error('Product already in wishlist!', err as Error)
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
        try{
            const wishlistData = wishlistSnapshot.data()

            const existingWishlistItem = wishlistData.wishlist.find((wishlistItem: WishlistProduct) => wishlistItem.item.id === id)        

            if(existingWishlistItem) {
                const updatedWishlist = wishlistData.wishlist.filter((wishlistItem: WishlistProduct) => wishlistItem.item.id !== id)
                
                await setDoc(wishlistDocRef, {
                    wishlist: updatedWishlist
                })   
            } else {
                throw new Error('Wishlist already removed!')
            }
        } catch(error) {
            throw new Error('Wishlist already removed!', error as Error)
        }
    }
}


// GET USER WISHLISTS
export const getWishlistAndDocuments = async() => {
    const userID = auth.currentUser?.uid;

    if(!userID) return []

    const wishlistDocRef = doc(db, 'wishlists', userID);
    const wishlistSnapshot = await getDoc(wishlistDocRef);

    if(!wishlistSnapshot.exists()) return []
    
    return wishlistSnapshot.data().wishlist.map((wishlistItem: WishlistProduct) => wishlistItem)
}

export const getCartItemsAndDocuments = async() => {
    const userID = auth.currentUser?.uid

    if(!userID) return []

    const cartDocRef = doc(db, 'carts', userID)
    const cartSnapshot = await getDoc(cartDocRef)

    if(!cartSnapshot.exists()) return []

    return cartSnapshot.data().cart.map((cartItem: CartItem) => cartItem)
}


// ADD PRODUCT ITEM TO CART
export const createCartDocumentOfUser = async(product: CategoryItem, quantity: number, category: string) => {
    const userID = auth.currentUser?.uid;

    if(!userID) throw new Error('You must log in first!')

    const cartDocRef = doc(db, 'carts', userID);
    const cartSnapshot = await getDoc(cartDocRef);

    const { id, name, description, price, imageUrl } = product

    if(!cartSnapshot.exists()) {
        try {
            await setDoc(cartDocRef, {
                cart: [{
                    id, 
                    name, 
                    description, 
                    price,
                    quantity,
                    imageUrl,
                    category,
                }]
            })
        } catch(error) {
            throw new Error('Failed Adding item to Cart', error as Error)
        }
    } else {
        try {
            
            const cartData = cartSnapshot.data()
            //FIND THE CART ITEM TO ADD
            const existingCartItem = cartData.cart.find((cartItem: CartItem) => cartItem.id === product.id);
            
            // CHECK IF THE CART ITEM EXISTS. IF IT IS ADD 1 TO THE CART ITEM QUANTITY
            if(existingCartItem !== undefined) {
                const updateCartItems = cartData.cart.map((cartItem: CartItem) => cartItem.id === product.id 
                    ? { ...cartItem, quantity: cartItem.quantity + quantity}
                    : cartItem)
                    

                await setDoc(cartDocRef, {
                    cart: updateCartItems
                })
                
            } else {
                const newCartItems = { id, name, description, price, quantity, imageUrl, category, }
                cartData.cart.push(newCartItems)

                await setDoc(cartDocRef, cartData)
            }

        } catch(error) {
            throw new Error('Failed Adding item to Cart', error as Error)
        }
    }
}

// DECREASE QTY OF ITEM TO CART
export const updateQtyItemToCartFromUserDocument = async(productID: string, quantity: number) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const cartDocRef = doc(db, 'carts', userID);
    const cartSnapshot = await getDoc(cartDocRef);

    if(cartSnapshot.exists()) {
        try {
            const cartData = cartSnapshot.data()
            
            //FIND THE CART ITEM TO ADD
            const existingCartItem = cartData.cart.find((cartItem: CartItem) => cartItem.id === productID);

            if(existingCartItem.quantity === quantity) {
                throw new Error("Can't update same Quantity!")
            }
            
            
            if(existingCartItem !== undefined) {
                const updatedCartItems = cartData.cart.map((cartItem: CartItem) => cartItem.id === productID 
                    ? { ...cartItem, quantity: quantity}
                    : cartItem)
                
                await setDoc(cartDocRef, {
                    cart: updatedCartItems
                })                
            }
        } catch(error) {
            throw new Error("Can't update same Quantity!", error as Error)
        }
    }
}

// REMOVE ITEM FROM CART OF USER
export const removeItemFromCartOfUser = async(productID: string) => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const cartDocRef = doc(db, 'carts', userID);
    const cartSnapshot = await getDoc(cartDocRef);

    if(cartSnapshot.exists()) {
        try {
            const cartData = cartSnapshot.data()

            const existingCartItem = cartData.cart.find((cartItem: CartItem) => cartItem.id === productID)

            if(existingCartItem){
                const updatedCartItems = cartData.cart.filter((cartItem: CartItem) => cartItem.id !== productID)

                await setDoc(cartDocRef, {
                    cart: updatedCartItems
                })
            } else {
                throw new Error('Item already removed!')
            }
        } catch(error) {
            throw new Error('Item already removed!', error as Error)
        }
    }
}

export const clearCartItemsOfUserAfterOrder = async() => {
    const userID = auth.currentUser?.uid;

    if(!userID) return

    const cartDocRef = doc(db, 'carts', userID);
    const cartSnapshot = await getDoc(cartDocRef);

    if(cartSnapshot.exists()) {
        try {
            await setDoc(cartDocRef, {
                cart: []
            })
        } catch(error) {
            console.error('Failed to remove item form cart', error)
        }
    }
}

export const createOrderDocumentOfUser = async(paymentMethod: string, cartItems: CartItem[], amount: number) => {
    const userID = auth.currentUser?.uid

    if(!userID) return

    const orderDocRef = doc(db, 'orders', userID);
    const orderSnapshot = await getDoc(orderDocRef);

    if(!orderSnapshot.exists()) {
        try {
            const createdAt = new Date()
            await setDoc(orderDocRef, {
                order: [{
                    id: v4(),
                    items: cartItems,
                    total: amount,
                    createdAt,
                    paymentMethod,
                }]
            })
        } catch(error) {
            console.log('Creating Order failed', error);
        }
    } else {
        try {
            const orderData = orderSnapshot.data()
            const createdAt = new Date()

            const newOrder = { id: v4(), items: cartItems, total: amount, createdAt, paymentMethod, }
            orderData.order.push(newOrder)

            await setDoc(orderDocRef, orderData)
        } catch(error) {
            console.log('Creating Order Failed', error);
            
        }
    }
}

export const getOrdersAndDocuments = async() => {
    const userID = auth.currentUser?.uid

    if(!userID) return

    const orderDocRef = doc(db, 'orders', userID);
    const orderSnapshot = await getDoc(orderDocRef);

    if(!orderSnapshot.exists()) return []

    return orderSnapshot.data().order.map((orders: Order) => orders)
}