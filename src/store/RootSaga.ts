import { all, call } from 'typed-redux-saga/macro'
import { categoriesSaga } from './categories/Category.saga'
import { userSagas } from './user/User.saga'
import { wishlistSaga } from './wishlist/Wishlist.saga'
import { CartSaga } from './cart/Cart.saga'

export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas), call(wishlistSaga), call(CartSaga)])
}