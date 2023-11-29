import { AnyAction } from "redux";

import { 
    signInFailed, 
    signUpFailed, 
    signOutFailed, 
    signOutSuccess, 
    signInSuccess, 
    emailSignInStart, 
    googleSignInStart, 
    clearUserErrorMessage,
    signUpStart,
    signOutStart,
    setProviderIDSuccess,
    updateUserInfoStart,
    updateUserInfoSuccess,
    updateUserInfoFailed,
    fetchUpdatedUserInfoStart,
    fetchUpdatedUserInfoSuccess,
    fetchUpdatedUserInfoFailed,
    updateUserPasswordStart,
    updateUserPasswordSuccess,
    updateUserPasswordFailed
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
    readonly userIsSigningOut: boolean;
    readonly providerID: string | null;
    readonly updatingUserInfo: boolean;
    readonly updatingUserPassword: boolean;
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
    userIsSigningOut: false,
    providerID: null,
    updatingUserInfo: false,
    updatingUserPassword: false,
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserState => {

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

    if(signOutStart.match(action)) {
        return {
            ...state,
            userIsSigningOut: true,
        }
    }

    if(googleSignInStart.match(action)) {
        return {
            ...state,
            googleSignInIsLoading: true,
            emailSignInButton: true,
        }
    }


    if(setProviderIDSuccess.match(action)) {
        return {
            ...state,
            providerID: action.payload
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
            userIsLoading: false,
        }
    }

    if(signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null,
            userIsSigningOut: false,
            providerID: null,
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

    if(updateUserInfoStart.match(action)) {
        return {
            ...state,
            updatingUserInfo: true,
        }
    }

    if(updateUserInfoSuccess.match(action)) {
        return {
            ...state,
            updatingUserInfo: false,
        }
    }

    if(updateUserInfoFailed.match(action)) {
        return {
            ...state,
            updatingUserInfo: false,
            error: action.payload,
        }
    }

    if(updateUserPasswordStart.match(action)) {
        return {
            ...state,
            updatingUserPassword: true,
        }
    }

    if(updateUserPasswordSuccess.match(action)) {
        return {
            ...state,
            updatingUserPassword: false,
        }
    }

    if(updateUserPasswordFailed.match(action)) {
        return {
            ...state,
            updatingUserPassword: false,
            error: action.payload,
        }
    }

    if(fetchUpdatedUserInfoStart.match(action)) {
        return {
            ...state,
            updatingUserInfo: true,
        }
    }

    if(fetchUpdatedUserInfoSuccess.match(action)) {
        return {
            ...state,
            updatingUserInfo: false,
            currentUser: action.payload,
        }
    }

    if(fetchUpdatedUserInfoFailed.match(action)) {
        return {
            ...state,
            updatingUserInfo: false,
            error: action.payload,
        }
    }

    return state
}