import { USER_ACTION_TYPES } from "./User.types"
import { createAction } from "../../utils/reducer/Reducer.utils"


export const setCurrentUser = (user) => {
   return createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user )
}