import { createSelector } from "reselect"

import { RootState } from "../Store";

import { UserState } from "./User.reducer"
import { create } from "domain";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.currentUser
)

export const selectEmailSignInIsLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.emailSignInIsLoading
)

export const selectGoogleSignInIsLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.googleSignInIsLoading
)

export const selectUserIsLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.userIsLoading
)

export const selectEmailSignInButton = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.emailSignInButton
)

export const selectGoogleSignInButton = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.googleSignInButton
)

export const selectUserError = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.error
)

export const selectSignUpIsLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.signUpIsLoading
)