import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Movie } from "../types/movietypes"   

export const fetchMovie = createAsyncThunk<Movie>(
  "movie/fetchMovie",
  async () => {
    const res = await axios.get(
     "https://api.themoviedb.org/3/movie/popular",{params:{language:"en-us",page:1,api_key:"9ad65dc78032dafb93a33fd0c77710d6"}})
    
    return res.data
  }
)


interface MovieState {
  data: Movie | null
  loading: boolean
  error: string | null
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: null,
}


const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovie(state) {
      state.data = null
      state.error = null
      state.loading = false
    },
    setMovie(state,action){
        state.data=action.payload
        
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovie.fulfilled, (state, action:PayloadAction<Movie>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch movie"
      })
  },
})

export const { clearMovie,setMovie } = movieSlice.actions
export default movieSlice.reducer
