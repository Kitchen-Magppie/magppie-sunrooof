import { configureStore } from '@reduxjs/toolkit';
import CmsReducers from '../app/cms/redux';

export const store = configureStore({
    reducer: {
        Cms: CmsReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // thunk: {},
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
