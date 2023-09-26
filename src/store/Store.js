import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from "./Root.reducer";
import { rootSaga } from "./RootSaga";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' 
        && logger,
        sagaMiddleware].filter(
    Boolean
)

// MIDDLEWARE = WILL RUN BEFORE AN ACTION HITS THE REDUCER
const composeEnhancer = (process.env.NODE_ENV !== 'production' 
    && window 
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
    || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

// ROOT REDUCER
export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)