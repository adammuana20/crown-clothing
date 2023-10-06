import { call } from "typed-redux-saga/macro";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import { userSagas, onCheckUserSession, onGoogleSignInStart, onEmailSignInStart, onSignUpStart, onSignUpSuccess, onSignOutStart, signOut, signInAfterSignUp, isUserAuthenticated, signInWithGoogle, signInWithEmail, signUp, getSnapshotFromUserAuth } from "../User.saga";
import { USER_ACTION_TYPES } from "../User.types";
import { signOutUser, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, getCurrentUser, createUserDocumentFromAuth } from "../../../utils/firebase/Firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "../User.action";


describe('User Saga tests', () => {
    test('userSaga', () => {
        testSaga(userSagas)
            .next()
            .all([
                call(onCheckUserSession), 
                call(onGoogleSignInStart), 
                call(onEmailSignInStart), 
                call(onSignUpStart), 
                call(onSignUpSuccess),
                call(onSignOutStart)
            ])
            .next()
            .isDone()
    })

    test('onSignOutStart', () => {
        testSaga(onSignOutStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
            .next()
            .isDone()
    })

    test('onSignUpSuccess', () => {
        testSaga(onSignUpSuccess)
            .next()
            .takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
            .next()
            .isDone()
    })

    test('onCheckUserSession', () => {
        testSaga(onCheckUserSession)
            .next()
            .takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
            .next()
            .isDone()
    })

    test('onGoogleSignInStart', () => {
        testSaga(onGoogleSignInStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
            .next()
            .isDone()
    })

    test('onEmailSignInStart', () => {
        testSaga(onEmailSignInStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
            .next()
            .isDone()
    })

    test('onSignUpStart', () => {
        testSaga(onSignUpStart)
            .next()
            .takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
            .next()
            .isDone()
    })

    test('signInAfterSignUp', () => {
        const mockUser = { id: 1, name: 'test'}
        const mockAdditionalDetails = { displayName: 'test' }
        const mockPayload = {
            user: mockUser,
            additionalDetails: mockAdditionalDetails
        }

        testSaga(signInAfterSignUp, {
            payload: mockPayload
        })
            .next()
            .call(getSnapshotFromUserAuth, mockUser, mockAdditionalDetails)
            .next()
            .isDone()
    })

    test('signOut success', () => {
        return expectSaga(signOut)
            .provide([[call(signOutUser)]])
            .put(signOutSuccess())
            .run()
    })

    test('signOut Failed', () => {
        const mockError = new Error('Signout Error')

        return expectSaga(signOut)
            .provide([[call(signOutUser), throwError(mockError)]])
            .put(signOutFailed(mockError))
            .run()
    })

    test('signUp success', () => {
        const mockEmail = 'test@gmail.com'
        const mockPassword = 'test1234'
        const mockDisplayName = 'test'
        const mockUser = { displayName: mockDisplayName, email: mockEmail }
        const mockUserCredential = { id: 1, user: mockUser }

        return expectSaga(signUp, {
            payload: { email: mockEmail, password: mockPassword, displayName: mockDisplayName }
        })
            .provide([
                [call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword), mockUserCredential]
            ])
            .put(signUpSuccess(mockUser, { displayName: mockDisplayName } ))
            .run()
    })

    test('signUp saga error path should call createAuthUserWithEmailAndPassword and put signUpFailed if failed', () => {
        const mockEmail = 'test@gmail.com'
        const mockPassword = 'test1234'
        const mockDisplayName = 'test'
        const mockError = new Error('An error occured')

        return expectSaga(signUp, {
            payload: { email: mockEmail, password: mockPassword, displayName: mockDisplayName}
        })
            .provide([
                [call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword), throwError(mockError)]
            ])
            .put(signUpFailed(mockError))
            .run()
    })

    test('signInWithEmail saga success path should call signInAuthUserWithEmailAndPassword and call getSnapshotFromUserAuth', () => {
        const mockEmail = 'test@gmail.com'
        const mockPassword = 'test1234'
        const mockUser = { displayName: 'test', email: mockEmail }
        const mockUserCredential = { id: 1, user: mockUser}

        return expectSaga(signInWithEmail, {
            payload: { email: mockEmail, password: mockPassword }
        })
            .provide([
                [call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword), mockUserCredential]
            ])
            .call(getSnapshotFromUserAuth, mockUserCredential.user)
            .run()
    })

    test('signInWithEmail saga error path should call signInAuthUserWithEmailAndPassword and put signInFailed on error', () => {
        const mockEmail = 'test@gmail.com'
        const mockPassword = 'test1234'
        const mockError = new Error('An error occured')

        return expectSaga(signInWithEmail, {
            payload: { email: mockEmail, password: mockPassword }
        })
            .provide([
                [call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword), throwError(mockError)]
            ])
            .put(signInFailed(mockError))
            .run()
    })

    test('signInWithGoogle saga success path should call signInWithGooglePopup and call getSnapshotFromUserAuth', () => {
        const mockUser = { id: 1, name: 'test' }
        const mockGoogleVal = { user: mockUser }
        return expectSaga(signInWithGoogle)
            .provide([
                [call(signInWithGooglePopup), mockGoogleVal]
            ])
            .call(getSnapshotFromUserAuth, mockUser)
            .run()
    })

    test('signInWithGoogle saga error path should call signInWithGooglePopup and put signInFailed on error', () => {
        const mockError = new Error('An error occured')

        return expectSaga(signInWithGoogle)
            .provide([
                [call(signInWithGooglePopup), throwError(mockError)]
            ])
            .put(signInFailed(mockError))
            .run()
    })

    test('isUserAuthenticated saga success path should call getSnapshotFromUserAuth and signIn if succesful', () => {
        const mockUserAuth = { id: 1, name: 'test' }

        return expectSaga(isUserAuthenticated)
            .provide([
                [call(getCurrentUser), mockUserAuth]
            ])
            .call(getSnapshotFromUserAuth, mockUserAuth)
            .run()
    })

    test('isUserAuthenticated saga error path should call getCurrentUser and put signInFailed if failed', () => {
        const mockError = new Error('An error occured')

        return expectSaga(isUserAuthenticated)
            .provide([
                [call(getCurrentUser), throwError(mockError)]
            ])
            .put(signInFailed(mockError))
            .run()
    })

    test('getSnapshotFromUserAuth saga should call createUserDocumentFromAuth and put signInSuccess', () => {
        const mockUser = { id: 1, name: 'test' }
        const mockAdditionalDetails = { displayName: 'test' }
        const mockUserSnapshot = { id: 2, data: () => ({ mockAdditionalDetails })}

        return expectSaga(getSnapshotFromUserAuth, mockUser, mockAdditionalDetails)
            .provide([
                [call(createUserDocumentFromAuth, mockUser, mockAdditionalDetails), mockUserSnapshot]
            ])
            .put(signInSuccess({id: mockUserSnapshot.id, ...mockUserSnapshot.data()}))
            .run()
    })

    test('getSnapshotFromUserAuth saga error path should put signInFailed on error', () => {
        const mockUser = { id: 1, name: 'test' }
        const mockAdditionalDetails = { displayName: 'test' }
        const mockError = new Error('An error occured')

        return expectSaga(getSnapshotFromUserAuth, mockUser, mockAdditionalDetails)
            .provide([
                [call(createUserDocumentFromAuth, mockUser, mockAdditionalDetails), throwError(mockError)]
            ])
            .put(signInFailed(mockError))
            .run()
    })
})