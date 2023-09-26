import { takeLatest, all, call, put } from 'redux-saga/effects'

import { USER_ACTION_TYPES } from './User.types'

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutFailed, signOutSuccess } from './User.action'

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from '../../utils/firebase/Firebase.utils'
 
export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation)
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch(error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch(error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user)
    } catch(error) {
        switch(error.code) {
            case 'auth/popup-closed-by-user':
                console.log('Google Signin Pop-up Closed');
                break
            default:
                console.log(error);
        }
    }
}

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        switch(error.code) {
            case 'auth/user-not-found':
                alert('Email does not exist')
                break
            case 'auth/wrong-password':
                alert('Incorrect Password for Email')
                break
            default:
                yield put(signInFailed(error))
        }
    }
}

export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, { displayName }))
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already exist.')
        }
        yield put(signUpFailed(error))
    }
}

export function* signOut() {
    try {   
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailed(error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}