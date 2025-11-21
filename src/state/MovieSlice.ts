import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Movie } from "../types/types.ts";
import type { Root } from "../types/types.ts";

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async ({page,endpoint}:{page:number,endpoint:string}) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${endpoint}`,
      {
        params: {
          language: "en-US",
          page: page,
          api_key: "9ad65dc78032dafb93a33fd0c77710d6",
        },
      }
    );

    return res.data;
  }
);

export interface MovieState {
  data: Root| null;
  loading: boolean;
  error: string | null;
  sortByEndpoint:string
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: null,
  sortByEndpoint:"popular"
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    
    setMovie(state, action: PayloadAction<Movie[]>) {
      if(state.data)state.data.results = action.payload;
      
    },
    setEndpoint(state, action: PayloadAction<string>) {
      state.sortByEndpoint = action.payload;
  }

    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        
        state.loading = true;
        state.error = null;
      })
      
      .addCase(fetchMovie.fulfilled, (state, action) => {
        console.log("api ok")
        state.loading = false;
        console.log(action.payload)
        state.data = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        console.log("api fail")
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch movie";
      });
  },
});

export const {  setMovie,setEndpoint } = movieSlice.actions;
export default movieSlice.reducer;
