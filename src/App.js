import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from './utils/firebase/Firebase.utils'

import Navigation from './routes/navigation/Navigation.component'
import Home from './routes/home/Home.component'
import Shop from './routes/shop/Shop.components'
import Authentication from './routes/authentication/Authentication.component'
import Contact from './routes/contact/Contact.component'
import Checkout from './routes/checkout/Checkout.component'
import { setCurrentUser } from './store/user/User.action'
import { checkUserSession } from './store/user/User.action'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index  element={<Home />} />
          <Route path='shop/*'  element={<Shop />} />
          {/* <Route path='contact'  element={<Contact />} /> */}
          <Route path='auth'  element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
    </Routes>
  );
}

export default App;