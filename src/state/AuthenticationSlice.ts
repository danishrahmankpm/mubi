import type { RequestTokenResponse, SessionIdResponse } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreateRequestToken=createAsyncThunk(
    "authentication/CreateRequestToken",
    async ()=>{
        const res=await axios.get("https://api.themoviedb.org/3/authentication/token/new",{
            params:{
                api_key:"9ad65dc78032dafb93a33fd0c77710d6"
            }
        })
        console.log(res.data);
        return res.data;
        

    }) 
export const CreateSessionId = createAsyncThunk(
  "authentication/CreateSessionId",
  async ({ request_token }: { request_token: string }) => {
    try{
      const res = await axios.post(
        "https://api.themoviedb.org/3/authentication/session/new",
        { request_token },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWQ2NWRjNzgwMzJkYWZiOTNhMzNmZDBjNzc3MTBkNiIsIm5iZiI6MTc2MTcxMTk4Ni45MTYsInN1YiI6IjY5MDE5NzcyODcyOThkZmE2YzQyYzFmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8r_MNcbqW7ggN_p3vrhFjnY6p5tE0AbaJSxDh4SjLJI`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch(error: any){
        console.log("error creating session id:",error.response?.data);
        
    }
  }
);


export interface Authstate{
    isAuthenticated:boolean;
    requestTokenAcquired:boolean;
    isloading:boolean;
    sessionIdData:SessionIdResponse | null;
    requestTokenData:RequestTokenResponse | null; 
}
const initialState:Authstate={
    requestTokenAcquired:false,
    isAuthenticated:false,
    isloading:false,
    sessionIdData:null,
    requestTokenData:null
}
export const AuthenticationSlice=createSlice({
    name:"authentication",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(CreateRequestToken.pending,(state)=>{
            state.isloading=true;
        })
        .addCase(CreateRequestToken.fulfilled,(state,action)=>{
            state.requestTokenAcquired=true;
            state.isloading=false;
            state.requestTokenData=action.payload;
            console.log("request token acquired:",action.payload);
        })
        .addCase(CreateRequestToken.rejected,(state)=>{
            state.isloading=false;
        })
        .addCase(CreateSessionId.pending,(state)=>{
            state.isloading=true;
        })
        .addCase(CreateSessionId.fulfilled,(state,action)=>{
            state.isAuthenticated=true;
            state.isloading=false;
            state.sessionIdData=action.payload;
            console.log("session id created:",action.payload);
        })
        .addCase(CreateSessionId.rejected,(state,action)=>{
            console.log("session id creation failed");
            console.log(action.error);  
            state.isloading=false;
        })
        
    }

    
});
export default AuthenticationSlice.reducer;
    


