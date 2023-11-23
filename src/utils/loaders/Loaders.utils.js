import { redirect } from "react-router-dom"

export async function requireAuth(currentUser) {
    const getCurrentUser = currentUser
    if(!getCurrentUser) {
        throw redirect('/sign-in')
    }
    return null
}

export async function alreadyLoggedIn(currentUser) {
    const userIsLoggedIn = currentUser
    if(userIsLoggedIn) {
        throw redirect('/')
    }
    return null
}