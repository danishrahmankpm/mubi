import React from "react";
import { addtoCart } from "../state/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../state/Store";
import { useAuth0 } from "@auth0/auth0-react";

export default function MovieCard({imgUrl,title,price,id}: {imgUrl: string;title: string;price: number;id:number}) {
  const dispatch=useDispatch()
  const movie=useSelector((state:RootState)=>state.movie.data?.find(m=>m.id===id))
  const {isAuthenticated,isLoading,user,loginWithRedirect,logout}=useAuth0()
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
      <button className="block w-full overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-transform">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
      </button>

     
      <div className="mt-3 flex items-center justify-between text-sm w-full">
        <div className="text-gray-700 font-medium">
          {`$${price}`}
        </div>
        <button
          disabled={!movie}
          onClick={() => {
            if(!isAuthenticated)return loginWithRedirect()
            movie && dispatch(addtoCart(movie))}}
          className="text-xs font-semibold uppercase tracking-wide px-3 py-2 rounded-sm transition-colors 
            border-none hover:bg-black hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add to cart
        </button>

      </div>
    </div>
  );
}
