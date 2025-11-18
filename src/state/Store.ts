import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./MovieSlice"


export const store=configureStore({
    reducer:{
        movie:movieSliceReducer
    }
})
export type RootState= ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;