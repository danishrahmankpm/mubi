import React, { use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../state/MovieSlice";
import type { AppDispatch, RootState } from "../state/Store";
import MovieCard from "./MovieCard";
import { MoviePagination } from "./Pagination";
import LoadingPage from "./LoadingPage";
import { setSearchLoading } from "../state/MovieSlice";
import {CreateRequestToken} from "@/state/AuthenticationSlice";




export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [sortByEndpoint, setSortByEndpoint] = useState("popular"); 
  

  const dispatch = useDispatch<AppDispatch>();
  
  const movies = useSelector((state: RootState) => state.movie.data?.results);
  const isAuthenticated=useSelector((state:RootState)=>state.auth.isAuthenticated)
  const loading = useSelector((state: RootState) => state.movie.loading);
  const searchloading = useSelector((state: RootState) => state.movie.searchloading);
  const requestTokenAcquired=useSelector((state:RootState)=>state.auth.requestTokenAcquired);
  const request_token=useSelector((state:RootState)=>state.auth.requestTokenData?.request_token);
  





  

  useEffect(() => {
    if (requestTokenAcquired && request_token) {
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/authcallback`;
    }
  }, [requestTokenAcquired, request_token]);
  useEffect(() => {
    
    dispatch(fetchMovie({ page: 1, endpoint: sortByEndpoint }));
    
  }, [dispatch, sortByEndpoint]);

  if(!movies){
    console.log("not movies")
    return <LoadingPage/>
  }

  if (loading && !searchloading) {
    console.log("here")
    return <LoadingPage />;
  }
  
  

  


  return (
  <div className="min-h-screen min-w-screen bg-black text-white">
    <header className="bg-black border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold tracking-tight">Movies</div>
          <div className="hidden sm:block w-[420px]">
            <input
              value={query}
              onChange={(e) => {setQuery(e.target.value);
                              dispatch(setSearchLoading(true));
                              dispatch(fetchMovie({ page: 1, endpoint: sortByEndpoint, searchString: e.target.value 
                                
                              }))}}
              placeholder="Search"
              className="w-full px-3 py-2 rounded-md border border-white/30 bg-black text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="flex gap-6 items-center text-sm text-white/70">
          <button className="hover:underline">
              FAVOURITES
            </button>
            <button className="hover:underline">
              LISTS
            </button>
          {!isAuthenticated && (
            <button
              className="hover:underline"
              onClick={() => dispatch(CreateRequestToken())}
            >
              LOG IN
          </button>
          )}
        </div>
      </div>
    </header>

    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center">EXPLORE</h1>
      <p className="text-center text-sm text-white/60 mt-2">
        Browse genres. Find films you didn't know you were looking for.
      </p>
    </section>
    {!query && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-black p-6 rounded-md shadow-sm border-none">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/70">SORT BY:</div>
                <select
                  value={sortByEndpoint}
                  onChange={(e) => setSortByEndpoint(e.target.value)}
                  className="px-3 py-2 border border-white/30 rounded-md bg-black text-white"
                >
                  <option value="popular">Popular</option>
                  <option value="top_rated">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}
      {query && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-black p-6 rounded-md shadow-sm border-none">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/70">SORT BY:</div>
                <select
                  value={sortByEndpoint}
                  onChange={(e) => setSortByEndpoint(e.target.value)}
                  className="px-3 py-2 border border-white/30 rounded-md bg-black text-white"
                >
                  <option value="popular">Popular</option>
                  <option value="top_rated">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}
    
    

    <div className="w-screen md:w-[80vw] lg:w-[75vw] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            
            imgUrl={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
            overview={m.overview}
            vote_average={m.vote_average}
            release_date={m.release_date}
            original_language={m.original_language}
          />
        ))}

        {movies.length === 0 && (
          <div className="mt-16 text-center text-white/60 text-lg">
            No films match your filters.
          </div>
        )}
      </div>
    </div>

    <MoviePagination />
    <footer className="h-24" />
  </div>
);

}
