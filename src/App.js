import { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useLocation } from 'react-router-dom'

import Spinner from './components/spinner/Spinner.component'

import { selectUserError } from './store/user/User.selector'
import { checkUserSession, clearUserErrorMessage } from './store/user/User.action'

import { fetchCategoriesStart, clearProductErrorMessage } from './store/categories/Category.action'
import { selectProductError } from './store/categories/Category.selector'

const Home = lazy(() => import('./routes/home/Home.component'))
const SignIn = lazy(() => import('./components/authentication/sign-in/SignInForm.component'))
const SignUp = lazy(() => import('./components/authentication/sign-up-form/SignUpForm.component'))
const Navigation = lazy(() => import('./routes/navigation/Navigation.component'))
const Shop = lazy(() => import('./routes/shop/Shop.components'))
const Checkout = lazy(() => import('./routes/checkout/Checkout.component'))
const Product = lazy(() => import('./routes/product/Product.component'))

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const userErrorMessage = useSelector(selectUserError)
  const productErrorMessage = useSelector(selectProductError)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  useEffect(() => {
    dispatch(fetchCategoriesStart())
}, [])

  useEffect(() => {
    if(userErrorMessage) {
      dispatch(clearUserErrorMessage())
    }

    if(productErrorMessage) {
      dispatch(clearProductErrorMessage())
    }
  }, [location.pathname])

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index  element={<Home />} />
            <Route path='shop/*'  element={<Shop />} />
            <Route path='product' element={<Product />} />
            <Route path='sign-in'  element={<SignIn />} />
            <Route path='sign-up'  element={<SignUp />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
      </Routes>
    </Suspense>
  );
}

export default App;