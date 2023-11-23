import { all, call } from 'typed-redux-saga/macro'
import { categoriesSaga } from './categories/Category.saga'
import { userSagas } from './user/User.saga'
import { wishlistSaga } from './wishlist/Wishlist.saga'

export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas), call(wishlistSaga)])
}