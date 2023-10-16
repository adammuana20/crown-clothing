import { AnyAction } from "redux";
import { User } from "firebase/auth"

import { 
    signInFailed, 
    signUpFailed, 
    signOutFailed, 
    signOutSuccess, 
    signInSuccess, 
    emailSignInStart, 
    googleSignInStart, 
    checkUserSessionComplete, 
    clearUserErrorMessage,
    signUpStart,
    signUpSuccess
} from "./User.action";
import { UserData } from "../../utils/firebase/Firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly userIsLoading: boolean;
    readonly signUpIsLoading: boolean;
    readonly emailSignInIsLoading: boolean;
    readonly emailSignInButton: boolean;
    readonly googleSignInIsLoading: boolean;
    readonly googleSignInButton: boolean;
    readonly error: Error | null;
}

export const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    userIsLoading: true,
    signUpIsLoading: false,
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

    if(signUpStart.match(action)) {
        return {
            ...state,
            signUpIsLoading: true,
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
            signUpIsLoading: false,
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
            signUpIsLoading: false,
        }
    }

    if(clearUserErrorMessage.match(action)) {
        return {
            ...state,
            error: null,
        }
    }

    return state
}