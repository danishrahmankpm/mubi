import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Movie } from "./types/movietypes";
import { fetchMovie } from "./state/MovieSlice";
import type { AppDispatch, RootState } from "./state/Store";
import {genres_util}  from "./utils/genres";
import {genre_map} from "./utils/genres"
import { lang_map } from "./utils/lang";
import { extractYear } from "./utils/years";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All genres");
  const [language, setLanguage] = useState("All languages");
  const [year, setYear] = useState("All years");
  const [sortBy, setSortBy] = useState("Most Popular");
  /* const [nowShowing, setNowShowing] = useState(false); */

  const dispatch = useDispatch<AppDispatch>();

 
  useEffect(() => {
    dispatch(fetchMovie());
  }, [dispatch]);

  const movies = useSelector((state: RootState) => state.movie.data);
  const loading = useSelector((state: RootState) => state.movie.loading);

  

  
  const filtered = useMemo(() => {
    const source = movies ?? []; 
    const res = source
      .map((m) => ({
        ...m,
        poster_path: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "",
        genre_list: m.genre_ids.map(g=>genre_map[g]),
        lang: lang_map[m.original_language] ?? m.original_language,
        year_range:extractYear(m.release_date.substring(0,4))

      }))
      .filter((m) => {
        const matchesTitle = m.title.toLowerCase().includes(query.trim().toLowerCase());
        const matchesGenre =
          genre === "All genres" ? true : m.genre_list.includes(genre);
        const matchesLanguage=
          language === "All languages"? true:m.lang===language
        const matchesYear=
          year === "All years"?true:m.year_range===year
        return matchesTitle && matchesGenre && matchesLanguage && matchesYear;
    });

      
        
    

    return res;
  }, [movies, query, genre, language, year, sortBy]);
  
  
  if (loading || !movies) {
    return <p>loading</p>;
  }
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-extrabold tracking-tight">MUBI</div>
            <div className="hidden sm:block w-[420px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
          <nav className="flex gap-6 items-center text-sm text-gray-600">
            
            <a className="hover:underline">LOG IN</a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center">EXPLORE</h1>
        <p className="text-center text-sm text-gray-500 mt-2">
          Browse genres. Find films you didn't know you were looking for.
        </p>
      </section>

 
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-3 items-center flex-wrap">
              <select value={genre} onChange={(e) => setGenre(e.target.value)} className="px-3 py-2 border rounded-md bg-white">
                <option>All genres</option>
                <option>Drama</option>
                <option>Documentary</option>
                <option>Action</option>
                <option>Family</option>
                <option>Western</option>

              </select>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-2 border rounded-md bg-white">
                <option>All languages</option>
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
                <option>Japanese</option>
              </select>
              <select value={year} onChange={(e) => setYear(e.target.value)} className="px-3 py-2 border rounded-md bg-white">
                <option>All years</option>
                <option>2020s</option>
                <option>2010s</option>
                <option>2000s</option>

              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">SORT BY:</div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded-md bg-white">
                <option>Most Popular</option>
                <option>Year: New to Old</option>
              </select>

              
            </div>
          </div>
        </div>
      </section>

      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((m) => (
            <article key={m.id} className="relative group overflow-hidden rounded-md shadow-md">
              <img src={m.poster_path} alt={m.title} className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 flex items-end p-4">
                <div>
                  <div className="text-white text-lg font-bold leading-tight">{m.title}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <div className="mt-8 text-center text-gray-500">No films match your filters.</div>}
      </main>

      

      <footer className="h-24" />
    </div>
  );
}
