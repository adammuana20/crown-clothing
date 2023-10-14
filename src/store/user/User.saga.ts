import { takeLatest, all, call, put } from 'typed-redux-saga/macro'
import { User } from 'firebase/auth'

import { USER_ACTION_TYPES } from './User.types'

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutFailed, signOutSuccess, EmailSignInStart, SignUpStart, SignUpSuccess, GoogleSignInStart, checkUserSessionComplete } from './User.action'

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser, AdditionalInformation } from '../../utils/firebase/Firebase.utils'
 
export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInformation)

        if(userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        }
    } catch(error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if(!userAuth) {
            yield* put(checkUserSessionComplete())
        } else {
            yield* call(getSnapshotFromUserAuth, userAuth)
            yield* put(checkUserSessionComplete())
        }
    } catch(error) {
        yield* put(signInFailed(error as Error))
    } 
}

export function* signInWithGoogle({payload: { navigate }}: GoogleSignInStart) {
    try {
        const { user } = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)
        yield* navigate('/', { replace: true })
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
            yield* navigate('/', { replace: true })
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
            } else {
                yield* put(signInFailed(error as Error))
            }
        }
    }
}

export function* signUp({ payload: { email, password, displayName }}: SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password)

        if(userCredential){
            const { user } = userCredential
            yield* put(signUpSuccess(user, { displayName }))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signOut() {
    try {   
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    } catch(error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails)
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

export function* userSagas() {
    yield* all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}