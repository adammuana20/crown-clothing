import { useEffect, lazy, Suspense, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Spinner from './components/spinner/Spinner.component'

import { checkUserSession } from './store/user/User.action'
import { selectCurrentUser } from './store/user/User.selector'

import { fetchCategoriesStart } from './store/categories/Category.action'
import { loader as ProductLoader } from './routes/product/Product.component'
import { loader as SignInLoader } from './components/authentication/sign-in/SignInForm.component'
import { loader as SignUpLoader } from './components/authentication/sign-up-form/SignUpForm.component'

const NotFound = lazy(() => import('./components/404.component'))
const Home = lazy(() => import('./routes/home/Home.component'))
const SignIn = lazy(() => import('./components/authentication/sign-in/SignInForm.component'))
const SignUp = lazy(() => import('./components/authentication/sign-up-form/SignUpForm.component'))
const Navigation = lazy(() => import('./routes/navigation/Navigation.component'))
const Shop = lazy(() => import('./routes/shop/Shop.components'))
const Checkout = lazy(() => import('./routes/checkout/Checkout.component'))
const Product = lazy(() => import('./routes/product/Product.component'))

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  useEffect(() => {
    dispatch(fetchCategoriesStart())
}, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navigation />} >
        <Route index  element={<Home />} />
        <Route path='shop/*'  element={<Shop />} />
        <Route path='product' element={<Product />} loader={() => ProductLoader(currentUser)} />
        <Route path='sign-in'  element={<SignIn />} loader={() => SignInLoader(currentUser)} />
        <Route path='sign-up'  element={<SignUp />} loader={() => SignUpLoader(currentUser)} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;