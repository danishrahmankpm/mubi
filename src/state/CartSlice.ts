import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, Movie } from "../types/types";

const initial:Cart={
    cart:[],
    totalPrice:0

}

 const cartSlice=createSlice({
    name:"productSlice",
    initialState:initial,
    reducers:{
        addtoCart(state,action:PayloadAction<Movie>){
            state.cart.push(action.payload)
            state.totalPrice+=9.99
        }
    }

 })
 export default cartSlice.reducer
 export const {addtoCart}=cartSlice.actions