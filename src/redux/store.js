import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { addExamQuestionsReducer, closeUpdateQuestionsReducer } from './examSlice'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({

    addExamQuestionsReducer: addExamQuestionsReducer,
    closeUpdateQuestionsReducer: closeUpdateQuestionsReducer

})

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
}, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store);
export default store