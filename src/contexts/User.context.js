import { createContext, useEffect, useReducer } from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/Firebase.utils'

import { createAction } from '../utils/reducer/Reducer.utils'

// AS THE ACTUAL VALUE YOU WANT TO ACCESS
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    const { type, payload } = action

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state

    const setCurrentUser = (user) => {
        dispatch(createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user ))
    }

    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unSubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unSubscribe
    }, [])
    
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}