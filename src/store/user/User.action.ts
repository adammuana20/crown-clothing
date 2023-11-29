import { USER_ACTION_TYPES } from "./User.types"
import { User } from "firebase/auth"
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/Reducer.utils"
import { UserData, AdditionalInformation } from "../../utils/firebase/Firebase.utils"

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>
export type GoogleSignInStart = ActionWithPayload<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, { navigate: Function }>
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string, navigate: Function }>
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>
export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>
export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, { email: string, password: string, displayName: string, navigate: Function }>
export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user: User, additionalDetails: AdditionalInformation }>
export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>
export type SignOutStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_START, { navigate: Function }>
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>
export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>
export type ClearUserErrorMessage = Action<USER_ACTION_TYPES.CLEAR_ERROR_MESSAGE>
export type SetProviderIDStart = Action<USER_ACTION_TYPES.SET_PROVIDER_ID_START>
export type SetProviderIDSuccess = ActionWithPayload<USER_ACTION_TYPES.SET_PROVIDER_ID_SUCCESS, string>
export type SetProviderIDFailed = ActionWithPayload<USER_ACTION_TYPES.SET_PROVIDER_ID_FAILED, Error>
export type UpdateUserInfoStart = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USER_INFO_START, { displayName: string, email: string, imageFile: string, selectedIamge: string }>
export type UpdateUserInfoSuccess = Action<USER_ACTION_TYPES.UPDATE_USER_INFO_SUCCESS>
export type UpdateUserInfoFailed = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USER_INFO_FAILED, Error>
export type UpdateUserPasswordStart = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USER_PASSWORD_START, { oldPassword: string, newPassword: string }>
export type UpdateUserPasswordSuccess = Action<USER_ACTION_TYPES.UPDATE_USER_PASSWORD_SUCCESS>
export type UpdateUserPasswordFailed = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USER_PASSWORD_FAILED, Error>
export type FetchUpdatedUserInfoStart = Action<USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_START>
export type FetchUpdatedUserInfoSuccess = ActionWithPayload<USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_SUCCESS, UserData>
export type FetchUpdatedUserInfoFailed = ActionWithPayload<USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_FAILED, Error>

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))
export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user ))
export const googleSignInStart = withMatcher((navigate: Function): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, { navigate }))
export const emailSignInStart = withMatcher((email: string, password: string, navigate: Function): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password, navigate }))
export const signInSuccess = withMatcher((user: UserData & { id: string}): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user))
export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error))
export const signUpStart = withMatcher((email: string, password: string, displayName: string, navigate: Function): SignUpStart => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName, navigate }))
export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformation): SignUpSuccess => createAction( USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }))
export const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction( USER_ACTION_TYPES.SIGN_UP_FAILED, error ))
export const signOutStart = withMatcher((navigate: Function): SignOutStart => createAction( USER_ACTION_TYPES.SIGN_OUT_START, { navigate }))
export const signOutSuccess = withMatcher((): SignOutSuccess => createAction( USER_ACTION_TYPES.SIGN_OUT_SUCCESS ))
export const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction( USER_ACTION_TYPES.SIGN_OUT_FAILED, error ))
export const clearUserErrorMessage = withMatcher((): ClearUserErrorMessage => createAction( USER_ACTION_TYPES.CLEAR_ERROR_MESSAGE ))
export const setProviderIDStart = withMatcher((): SetProviderIDStart => createAction(USER_ACTION_TYPES.SET_PROVIDER_ID_START))
export const setProviderIDSuccess = withMatcher((providerID: string): SetProviderIDSuccess => createAction(USER_ACTION_TYPES.SET_PROVIDER_ID_SUCCESS, providerID))
export const setProviderIDFailed = withMatcher((error: Error): SetProviderIDFailed => createAction( USER_ACTION_TYPES.SET_PROVIDER_ID_FAILED, error ))
export const updateUserInfoStart = withMatcher((displayName: string, email: string, imageFile: string, selectedIamge: string): UpdateUserInfoStart => createAction(USER_ACTION_TYPES.UPDATE_USER_INFO_START, { displayName, email, imageFile, selectedIamge }))
export const updateUserInfoSuccess = withMatcher((): UpdateUserInfoSuccess => createAction(USER_ACTION_TYPES.UPDATE_USER_INFO_SUCCESS))
export const updateUserInfoFailed = withMatcher((error: Error): UpdateUserInfoFailed => createAction( USER_ACTION_TYPES.UPDATE_USER_INFO_FAILED, error ))

export const updateUserPasswordStart = withMatcher((oldPassword: string, newPassword: string): UpdateUserPasswordStart => createAction(USER_ACTION_TYPES.UPDATE_USER_PASSWORD_START, { oldPassword, newPassword }))
export const updateUserPasswordSuccess = withMatcher((): UpdateUserPasswordSuccess => createAction(USER_ACTION_TYPES.UPDATE_USER_PASSWORD_SUCCESS))
export const updateUserPasswordFailed = withMatcher((error: Error): UpdateUserPasswordFailed => createAction( USER_ACTION_TYPES.UPDATE_USER_PASSWORD_FAILED, error ))

export const fetchUpdatedUserInfoStart = withMatcher((): FetchUpdatedUserInfoStart => createAction(USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_START))
export const fetchUpdatedUserInfoSuccess = withMatcher((user: UserData & { id: string}): FetchUpdatedUserInfoSuccess => createAction(USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_SUCCESS, user))
export const fetchUpdatedUserInfoFailed = withMatcher((error: Error): FetchUpdatedUserInfoFailed => createAction( USER_ACTION_TYPES.FETCH_UPDATED_USER_INFO_FAILED, error ))