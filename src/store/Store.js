import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./Root.reducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' 
        && logger,
        thunk].filter(
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

export const persistor = persistStore(store)