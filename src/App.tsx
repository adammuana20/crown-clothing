import { useEffect, lazy, Suspense, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Spinner from './components/spinner/Spinner.component'

import { checkUserSession } from './store/user/User.action'
import { selectCurrentUser, selectUserIsLoading } from './store/user/User.selector'
import { fetchCategoriesStart } from './store/categories/Category.action'
import { GlobalStyle } from './global.styles'
import { fetchWishlistStart } from './store/wishlist/Wishlist.action'
import { fetchCartItemsStart } from './store/cart/Cart.action'
import { selectWishlistIsLoading } from './store/wishlist/Wishlist.selector'

const PrivateRoute = lazy(() => import('./routes/private-route/PrivateRoute.component'))
const Profile = lazy(() => import('./routes/profile/Profile.component'))
const NotFound = lazy(() => import('./components/404.component'))
const Home = lazy(() => import('./routes/home/Home.component'))
const SignIn = lazy(() => import('./components/authentication/sign-in/SignInForm.component'))
const SignUp = lazy(() => import('./components/authentication/sign-up-form/SignUpForm.component'))
const Layout = lazy(() => import('./routes/layout/Layout.component'))
const Shop = lazy(() => import('./routes/shop/Shop.components'))
const Checkout = lazy(() => import('./routes/checkout/Checkout.component'))
const Product = lazy(() => import('./routes/product/Product.component'))
const Wishlist = lazy(() => import('./components/wishlist/wishlist-items/WishlistItems.component'))

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const checkingUserSession = useSelector(selectUserIsLoading)
  
  useEffect(() => {
    dispatch(checkUserSession())
    dispatch(fetchCategoriesStart())
  }, [])

  useEffect(() => {
    if(currentUser && currentUser.id) {
      dispatch(fetchWishlistStart())
      dispatch(fetchCartItemsStart())
    }
  }, [currentUser])



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route index  element={<Home />} />
        <Route path='shop/*'  element={<Shop />} />
        <Route element={<PrivateRoute navigateToPath='sign-in' isAllowed={!!currentUser && !!currentUser.roles && currentUser.roles.includes('customer')} />}>
          <Route path='profile'  element={<Profile />} />
          <Route path='wishlist'  element={<Wishlist />} />
        </Route>
        <Route element={<PrivateRoute navigateToPath='sign-in' isAllowed={!!currentUser && !!currentUser.roles && currentUser.roles.includes('admin')}/>}>
          <Route path='product' element={<Product />}/>
        </Route>
        <Route element={<PrivateRoute navigateToPath='/' isAllowed={!currentUser}/>}>
          <Route path='sign-in'  element={<SignIn />} />
          <Route path='sign-up'  element={<SignUp />} />
        </Route>

        <Route path='checkout' element={<Checkout />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      { checkingUserSession ? <Spinner />
        : <RouterProvider router={router} />
      }
    </Suspense>
  );
}

export default App;