import { addtoCart } from "@/state/CartSlice";
import type { RootState } from "@/state/Store";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

export default function MovieCard({ imgUrl, title, price, id }: {
  imgUrl: string;
  title: string;
  price: number;
  id: number;
}) {
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) =>
    state.movie.data?.results.find((m) => m.id === id)
  );
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
      <div className="relative group">
        <button className="block w-full overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-transform">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          
          <div
            className="
              absolute bottom-0 left-0 right-0 h-20
              bg-gradient-to-t from-black/70 to-transparent
            "
          />

          
          <div className="absolute bottom-2 left-2 text-white leading-5">
            <div className="font-bold text-base tracking-tight">
              {title}
            </div>
            
          </div>
        </button>
      </div>

     
      <div className="mt-3 flex items-center justify-between text-sm w-full">
        <div className="text-white font-medium">${price}</div>

        <button
          disabled={!movie}
          onClick={() => {
            if (!isAuthenticated) return loginWithRedirect();
            movie && dispatch(addtoCart(movie));
          }}
          className="text-xs font-semibold uppercase tracking-wide px-3 py-2 rounded-sm 
          transition-colors hover:bg-black hover:text-white cursor-pointer
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
