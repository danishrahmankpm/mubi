import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./MovieSlice"
import cartSliceReducer from "./CartSlice"


export const store=configureStore({
    reducer:{
        movie:movieSliceReducer,
        cart:cartSliceReducer
    }
})
export type RootState= ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;