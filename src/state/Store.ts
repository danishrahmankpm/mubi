import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./MovieSlice"

import authSliceReducer from "./AuthenticationSlice"


export const store=configureStore({
    reducer:{
        movie:movieSliceReducer,
        auth:authSliceReducer
    }
})
export type RootState= ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;