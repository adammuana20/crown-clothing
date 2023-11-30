import { takeLatest, all, call, put } from 'typed-redux-saga/macro'
import { User } from 'firebase/auth'

import { USER_ACTION_TYPES } from './User.types'

import { signInSuccess, checkUserSessionComplete, signInFailed, signUpSuccess, signUpFailed, signOutFailed, signOutSuccess, EmailSignInStart, SignUpStart, SignUpSuccess, GoogleSignInStart, SignOutStart, setProviderIDFailed, setProviderIDSuccess, setProviderIDStart, updateUserInfoFailed, UpdateUserInfoStart, updateUserInfoSuccess, fetchUpdatedUserInfoSuccess, fetchUpdatedUserInfoFailed, fetchUpdatedUserInfoStart, updateUserPasswordFailed, UpdateUserPasswordStart, updateUserPasswordSuccess } from './User.action'

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser, AdditionalInformation, getAuthUserProviderID, updateUserProfileFromDocument, getUpdatedUserInfo, updateUserPasswordFromDocument } from '../../utils/firebase/Firebase.utils'
import { fetchWishlistStart } from '../wishlist/Wishlist.action'
import { fetchCartItemsStart } from '../cart/Cart.action'
 
export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInformation)

        if(userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
            yield* put(setProviderIDStart())
        }
    } catch(error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* updateUserInfo({payload: { displayName, email, imageFile, selectedIamge }}: UpdateUserInfoStart) {
    try {
        yield* call(updateUserProfileFromDocument, displayName, email, imageFile, selectedIamge)
        yield* put(updateUserInfoSuccess())
        yield* put(fetchUpdatedUserInfoStart())
    } catch(error) {
        yield* put(updateUserInfoFailed(error as Error))
    }
}

export function* updateUserPassword({payload: { oldPassword, newPassword }}: UpdateUserPasswordStart) {
    try {
        yield* call(updateUserPasswordFromDocument, oldPassword, newPassword)
        yield* put(updateUserPasswordSuccess())
    } catch(error) {
        yield* put(updateUserPasswordFailed(error as Error))
    }
}

export function* fetchUpdatedUserInfo() {
    try{
        const userSnapshot = yield* call(getUpdatedUserInfo)

        if(userSnapshot) {
            yield* put(fetchUpdatedUserInfoSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        }
    } catch(error) {
        yield* put(fetchUpdatedUserInfoFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) {
            yield* put(checkUserSessionComplete())
        } else {
            yield* call(getSnapshotFromUserAuth, userAuth)
        }
    } catch (error) {
      yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle({payload: { navigate }}: GoogleSignInStart) {
    try {
        const { user } = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)
        navigate('/', { replace: true })
    } catch(error) {
        if(error instanceof Error && 'code' in error) {
            const firebaseError = error as { code: string }
            if(firebaseError.code === "auth/popup-closed-by-user") {
                const errorMessage = new Error("Pop-up Closed")                
                yield* put(signInFailed(errorMessage as Error))
            } else {
                yield* put(signInFailed(error as Error))
            }
        }
    }
}

export function* signInWithEmail({ payload: { email, password, navigate }}: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password)

        if(userCredential) {
            const { user } = userCredential
            yield* call(getSnapshotFromUserAuth, user)
            navigate('/', { replace: true })
        }
    } catch (error) {
        if (error instanceof Error && 'code' in error) {
            const firebaseError = error as { code: string };
            if (firebaseError.code === "auth/user-not-found") {
              const errorMessage = new Error("User not found");
              yield* put(signInFailed(errorMessage as Error));
            } else if(firebaseError.code === "auth/wrong-password") {
                const errorMessage = new Error("Incorrect Password");
                yield* put(signInFailed(errorMessage as Error));
            } else if(firebaseError.code === "auth/too-many-requests") {
                const errorMessage = new Error("Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.");
                yield* put(signInFailed(errorMessage as Error));
            } else if(firebaseError.code === "auth/network-request-failed") {
                const errorMessage = new Error("Please try again later! Maybe you have a slow connection.");
                yield* put(signInFailed(errorMessage as Error));
            } else {
                yield* put(signInFailed(error as Error))
            }
        }
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}


export function* signUp({ payload: { email, password, displayName, navigate }}: SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password)

        if(userCredential){
            const { user } = userCredential
            yield* put(signUpSuccess(user, { displayName }))
            navigate('/', { replace: true })
        }
    } catch (error) {
        const firebaseError = error as { code: string }
        if(firebaseError.code === "auth/email-already-in-use") {
            const errorMessage = new Error("Cannot create user, Email already exist!");
            yield* put(signInFailed(errorMessage as Error));
        } else {
            yield* put(signUpFailed(error as Error))
        }   
    }
}

export function* signOut({payload: { navigate }}: SignOutStart) {
    try {   
        yield* call(signOutUser)
        yield* put(signOutSuccess())
        yield* put(fetchWishlistStart())
        yield* put(fetchCartItemsStart())
        navigate('sign-in', { replace: true })
    } catch(error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* setProviderID() {
    try {
        const providerID = yield* call(getAuthUserProviderID)

        if(providerID) {
            yield* put(setProviderIDSuccess(providerID))
        }
        
    } catch(error) {
        yield* put(setProviderIDFailed(error as Error))
    }
}



export function* onSetProviderID() {
    yield* takeLatest(USER_ACTION_TYPES.SET_PROVIDER_ID_START, setProviderID)
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* onUpdateUserInfo() {
    yield* takeLatest(USER_ACTION_TYPES.UPDATE_USER_INFO_START, updateUserInfo)
}

export function* onFetchUpdatedUserInfo() {
    yield* takeLatest(USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_START, fetchUpdatedUserInfo)
}

export function* onUpdateUserPasword() {
    yield* takeLatest(USER_ACTION_TYPES.UPDATE_USER_PASSWORD_START, updateUserPassword)
}


export function* userSagas() {
    yield* all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart),
        call(onSetProviderID),
        call(onUpdateUserInfo),
        call(onFetchUpdatedUserInfo),
        call(onUpdateUserPasword),
    ])
}