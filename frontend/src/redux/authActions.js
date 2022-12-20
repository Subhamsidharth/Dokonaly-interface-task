import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';

export const userLogin = createAsyncThunk('user/login', async ({email,password}, { rejectWithValue }) => {
console.log(email,password,"data")
    try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        const response = await fetch(
          `//localhost:4000/login`,{
            method:"POST",
            body: JSON.stringify({email:email,password:password}),
            headers: {
                'Content-Type': 'application/json',
              }
          }
        )

        const responseData = await response.json();
        if(responseData.status){
            toast.success(responseData.message)
        }
        console.log(responseData)
  
        // store user's token in local storage
        localStorage.setItem('userToken', responseData.data)
  
        return responseData;
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.message) {
            toast.error(error.response)
          return rejectWithValue(error.response.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )
  


  