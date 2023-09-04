import { Routes, Route } from 'react-router-dom'

import Navigation from './routes/navigation/Navigation.component'
import Home from './routes/home/Home.component'
import Shop from './routes/shop/Shop.components'
import Authentication from './routes/authentication/Authentication.component'
import Contact from './routes/contact/Contact.component'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index  element={<Home />} />
          <Route path='shop'  element={<Shop />} />
          <Route path='contact'  element={<Contact />} />
          <Route path='auth'  element={<Authentication />} />
        </Route>
    </Routes>
  );
}

export default App;