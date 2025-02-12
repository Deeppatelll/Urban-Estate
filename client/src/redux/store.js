import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'; // Fix: Correct import name
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer }); // Fix: Correct variable name

const persistConfig = {
    key: 'root',
    storage,  // Fix: Corrected typo from 'Storage' to 'storage'
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
