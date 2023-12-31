import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js'
import { ToastProvider } from './contexts/Toast.context';
import { ThemeProvider } from './contexts/Theme.context';

import App from './App';
import { store, persistor } from './store/Store';
import { stripePromise } from './utils/stripe/Stripe.utils';
import * as serviceWorkingRegistration from './serviceWorkerRegistration'

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <ThemeProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </ThemeProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkingRegistration.register();