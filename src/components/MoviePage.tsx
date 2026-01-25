import type { RootState } from "@/state/Store";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function MoviePage() {
    const {id}=useParams()
    const movieId = Number(id)
    const movie = useSelector((state: RootState) => state.movie.data?.results.find(m => m.id === movieId));
  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-8">
      {/* Page Container */}
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Cover Section */}
        <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-neutral-800">
          {/* Cover Image */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt="Cover"
            className="w-full h-full object-cover"
          />

          {/* Add to List */}
          <button className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-2 rounded-md text-sm hover:bg-black/80">
            <span className="text-lg">◇</span>
            Add to list
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg">
            <h1 className="text-xl font-semibold">{movie?.title}</h1>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Description */}
          <div className="lg:col-span-2 bg-neutral-900 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              {movie?.overview}
            </p>
          </div>

          {/* Tabs Section */}
          <div className="bg-neutral-900 rounded-xl p-5">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 pb-2 mb-4 text-sm">
              <button className="font-semibold">Cast</button>
              <button className="text-white/60">Crew</button>
              <button className="text-white/60">Details</button>
            </div>

            {/* Tab Content */}
            <div className="text-sm text-white/70 space-y-2">
              <p>Actor 1</p>
              <p>Actor 2</p>
              <p>Actor 3</p>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        <div className="bg-neutral-900 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Related Movies</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-neutral-800 rounded-lg overflow-hidden hover:scale-[1.02] transition"
              >
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Related"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
