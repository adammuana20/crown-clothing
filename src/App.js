import { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useLocation } from 'react-router-dom'

import Spinner from './components/spinner/Spinner.component'
import { selectError } from './store/user/User.selector'
import { checkUserSession, clearErrorMessage } from './store/user/User.action'
import { fetchCategoriesStart } from './store/categories/Category.action'

const Home = lazy(() => import('./routes/home/Home.component'))
const SignIn = lazy(() => import('./components/sign-in/SignInForm.component'))
const SignUp = lazy(() => import('./components/sign-up-form/SignUpForm.component'))
const Navigation = lazy(() => import('./routes/navigation/Navigation.component'))
const Shop = lazy(() => import('./routes/shop/Shop.components'))
const Checkout = lazy(() => import('./routes/checkout/Checkout.component'))

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const errorMessage = useSelector(selectError)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  useEffect(() => {
    dispatch(fetchCategoriesStart())
}, [])

  useEffect(() => {
    if(errorMessage) {
      dispatch(clearErrorMessage())
    }
  }, [location.pathname])

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index  element={<Home />} />
            <Route path='shop/*'  element={<Shop />} />
            <Route path='sign-in'  element={<SignIn />} />
            <Route path='sign-up'  element={<SignUp />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
      </Routes>
    </Suspense>
  );
}

export default App;