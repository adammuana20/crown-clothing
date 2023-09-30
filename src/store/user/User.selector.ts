import { createSelector } from "reselect"

import { RootState } from "../Store";

import { UserState } from "./User.reducer"

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser)