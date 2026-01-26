import type { RootState } from "@/state/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = Number(id);

  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<string[]>([]);
  const [crew, setCrew] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"cast" | "crew" | "details">("cast");
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);
  const navigate = useNavigate();
  
  async function fetchMovieCredits(movieId: number) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        params: {
          api_key: "9ad65dc78032dafb93a33fd0c77710d6",
          language: "en-US",
        },
      }
    );

    setCast(res.data.cast.map((c: any) => c.name));
    setCrew(res.data.crew.map((c: any) => c.name));
  }
  async function fetchRelatedMovies(movieId: number) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
      {
        params: {
          api_key: "9ad65dc78032dafb93a33fd0c77710d6",
          language: "en-US",
        },
      }
    );
    setRelatedMovies(res.data.results);
  }
  
  async function fetchMovieDetails(movieId: number) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: "9ad65dc78032dafb93a33fd0c77710d6",
          language: "en-US",
        },
      }
    );
    setMovie(res.data);
  }

  useEffect(() => {
    if (!movieId) return;
    fetchMovieDetails(movieId);
    fetchRelatedMovies(movieId);
    fetchMovieCredits(movieId);
  }, [movieId]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-black/70 px-3 py-2 rounded-md text-sm hover:bg-black/90"
      >
        ← Back
      </button>

      {/* Header */}
      <header className="bg-black border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-2xl font-extrabold tracking-tight">Movies</div>

          <div className="flex gap-6 items-center text-sm text-white/70">
            <button className="hover:underline">FAVOURITES</button>
            <button className="hover:underline">LISTS</button>
            <button className="hover:underline">LOG IN</button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex justify-center px-4 py-8">
        <div className="w-full md:w-[85%] lg:w-[85%] space-y-6">

          {/* Cover Section */}
          <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-neutral-800">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              className="w-full h-full object-cover"
            />

            <button className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-2 rounded-md text-sm hover:bg-black/80">
              <span className="text-lg">◇</span>
              Add to list
            </button>

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

            {/* Tabs */}
            <div className="bg-neutral-900 rounded-xl p-5">
              <div className="flex gap-6 border-b border-white/10 pb-2 mb-4 text-sm">
                <button
                  onClick={() => setActiveTab("cast")}
                  className={activeTab === "cast" ? "font-semibold" : "text-white/60"}
                >
                  Cast
                </button>
                <button
                  onClick={() => setActiveTab("crew")}
                  className={activeTab === "crew" ? "font-semibold" : "text-white/60"}
                >
                  Crew
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={activeTab === "details" ? "font-semibold" : "text-white/60"}
                >
                  Details
                </button>
              </div>

              <div className="text-sm text-white/70 space-y-2 max-h-64 overflow-y-auto">
                {activeTab === "cast" &&
                  cast.map((name, idx) => <div key={idx}>{name}</div>)}

                {activeTab === "crew" &&
                  crew.map((name, idx) => <div key={idx}>{name}</div>)}

                {activeTab === "details" && (
                  <div className="space-y-1">
                    <div>Release Date: {movie?.release_date}</div>
                    <div>Language: {movie?.original_language}</div>
                    <div>Rating: {movie?.vote_average}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Movies */}
          <div className="bg-neutral-900 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Related Movies</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {relatedMovies.map((m) => (
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
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
