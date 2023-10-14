import { AnyAction } from "redux";

import { signInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess, emailSignInStart, googleSignInStart, checkUserSessionComplete, clearErrorMessage } from "./User.action";
import { UserData } from "../../utils/firebase/Firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly userIsLoading: boolean;
    readonly emailSignInIsLoading: boolean;
    readonly emailSignInButton: boolean;
    readonly googleSignInIsLoading: boolean;
    readonly googleSignInButton: boolean;
    readonly error: Error | null;
}

export const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    userIsLoading: true,
    emailSignInIsLoading: false,
    emailSignInButton: false,
    googleSignInIsLoading: false,
    googleSignInButton: false,
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
            googleSignInButton: true,
        }
    }

    if(googleSignInStart.match(action)) {
        return {
            ...state,
            googleSignInIsLoading: true,
            emailSignInButton: true,
        }
    }

    if(signInSuccess.match(action)) {
        return { 
            ...state,
            currentUser: action.payload,
            emailSignInIsLoading: false,
            googleSignInIsLoading: false,
            googleSignInButton: false,
            emailSignInButton: false,
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
            googleSignInButton: false,
            emailSignInButton: false,
        }
    }

    if(clearErrorMessage.match(action)) {
        return {
            ...state,
            error: null,
        }
    }

    return state
}