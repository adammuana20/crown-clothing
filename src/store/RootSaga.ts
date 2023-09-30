import { all, call } from 'typed-redux-saga/macro'
import { categoriesSaga } from './categories/Category.saga'
import { userSagas } from './user/User.saga'

export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas)])
}