import { AnyAction } from "redux";

import { signInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess, emailSignInStart, googleSignInStart, checkUserSessionComplete } from "./User.action";
import { UserData } from "../../utils/firebase/Firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly userIsLoading: boolean;
    readonly emailSignInIsLoading: boolean;
    readonly googleSignInIsLoading: boolean;
    readonly error: Error | null;
}

export const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    userIsLoading: true,
    emailSignInIsLoading: false,
    googleSignInIsLoading: false,
    error: null,
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserState => {

    if(checkUserSessionComplete.match(action)) {
        return {
            ...state,
            userIsLoading: false,
        }
    }

    if(emailSignInStart.match(action)) {
        return {
            ...state,
            emailSignInIsLoading: true,
        }
    }

    if(googleSignInStart.match(action)) {
        return {
            ...state,
            googleSignInIsLoading: true,
        }
    }

    if(signInSuccess.match(action)) {
        return { 
            ...state,
            currentUser: action.payload,
            emailSignInIsLoading: false,
            googleSignInIsLoading: false,
        }
    }

    if(signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null,
        }
    }

    if(signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            emailSignInIsLoading: false,
            googleSignInIsLoading: false,
        }
    }

    return state
}