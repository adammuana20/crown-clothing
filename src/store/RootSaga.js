import { all, call } from 'redux-saga/effects'
import { categoriesSaga } from './categories/Category.saga'
import { userSagas } from './user/User.saga'

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)])
}