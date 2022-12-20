import {createSlice} from '@reduxjs/toolkit';
import { userLogin } from './authActions';

const initialState = {
    loading:false,
    isLoggedIn: false,
    userToken :null,
    userInfo:null,
    error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout: (state) => {
          localStorage.removeItem('userid');
          localStorage.removeItem('token');
          state.loading = false;
          state.isLoggedIn = false;
          state.userInfo = null;
          state.userToken = null;
          state.error = null;
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload
          },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending,(state) => {
            state.loading = true
            state.error = null
          })
          builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            // state.loading = false,
            state.loading = false;
            state.isLoggedIn = true;
            state.userInfo = payload.data;
            state.userToken = payload.userToken;
           
          })
       
          builder.addCase(userLogin.rejected,(state, { payload }) => {
            console.log(payload)
            state.loading = false
            state.error = payload.message;
          })
          
    }
});

export default authSlice.reducer;