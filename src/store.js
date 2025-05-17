import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import authReducer from './redux/slices/authSlice';
import loanReducer from './redux/slices/loanSlice';
// 1. Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    loan: loanReducer,
    // add more reducers if needed
});

// 2. Setup persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only persist auth slice
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

// 5. Create persistor
export const persistor = persistStore(store);

export default store;
