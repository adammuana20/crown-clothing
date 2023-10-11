import { createSelector } from "reselect"

import { RootState } from "../Store";

import { UserState } from "./User.reducer"

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

export const selectError = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.error
)