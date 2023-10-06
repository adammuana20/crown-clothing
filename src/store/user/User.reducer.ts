import { AnyAction } from "redux";

import { signInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess } from "./User.action";
import { UserData } from "../../utils/firebase/Firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserState => {

    if(signInSuccess.match(action)) {
        return { 
            ...state,
            currentUser: action.payload
        }
    }

    if(signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        }
    }

    if(signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            error: action.payload
        }
    }

    return state
}