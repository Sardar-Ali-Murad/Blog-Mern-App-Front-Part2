import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

let initialState={
    isLoading:false,
    showAlert:false,
    alertType:"",
    alertText:"",
    user:JSON.parse(localStorage.getItem("user")) || null,
    token:JSON.parse(localStorage.getItem("token")) || "",
    light:JSON.parse(localStorage.getItem("light")) || false,
    userImage:""
}
import {setupUserLogin,setupUserRegister,userImage}  from "./userThunk"

export const setupUserLoginApi=createAsyncThunk("user/setupUserLogin",async(data,thunkAPI)=>{
    return setupUserLogin(data,"login",thunkAPI)
})


export const setupUserRegisternApi=createAsyncThunk("user/setupUserRegister",async(data,thunkAPI)=>{
    return setupUserRegister(data,"register",thunkAPI)
})


// This is needed if we are doing this in the backend
export const uploadUserImage=createAsyncThunk("user/userImage",async(event,thunkAPI)=>{
    return userImage(event,thunkAPI)
})

function addLightToLocalStorage(status){
  localStorage.setItem("light",JSON.stringify(status))
}

function addUserToLocalStorage(user,token){
   localStorage.setItem("user",JSON.stringify(user))
   localStorage.setItem("token",JSON.stringify(token))
}


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
       removeAlert:(state)=>{
         state.isLoading=false
         state.alertText="",
         state.alertType="",
         state.showAlert=false
       },
       logoutUser:(state)=>{
        state.user=null
        state.token=""
       },
       deleteUserImage:(state)=>{
        state.userImage=""
       },
       changeLight:(state)=>{
          state.light=!state.light
          addLightToLocalStorage(state.light)
       },
    },
    extraReducers:{
        [setupUserLoginApi.pending]:(state)=>{
          state.isLoading=true
        },
        [setupUserLoginApi.fulfilled]:(state,{payload})=>{
          state.user=payload.user
          state.token=payload.token
          state.isLoading=false
          state.showAlert=true
          state.alertType="success"
          state.alertText="Login Success! Redirecting"
          addUserToLocalStorage(payload.user,payload.token)
        },
        [setupUserLoginApi.rejected]:(state,{payload})=>{
          state.isLoading=false
          state.showAlert=true
          state.alertType="danger"
          state.alertText=payload
        },
        [setupUserRegisternApi.pending]:(state)=>{
          state.isLoading=true
        },
        [setupUserRegisternApi.fulfilled]:(state,{payload})=>{
          state.user=payload.user
          state.token=payload.token
          state.isLoading=false
          state.showAlert=true
          state.alertType="success"
          state.alertText="Login Success! Redirecting"
          addUserToLocalStorage(payload.user,payload.token)
        },
        [setupUserRegisternApi.rejected]:(state,{payload})=>{
          state.isLoading=false
          state.showAlert=true
          state.alertType="danger"
          state.alertText=payload
        },
        [uploadUserImage.fulfilled]:(state,{payload})=>{
            state.userImage=payload.data.secure_url
            state.isLoading=false
        },
        [uploadUserImage.pending]:(state)=>{
          state.isLoading=true
        },
        [uploadUserImage.rejected]:(state,props)=>{
          console.log(props)
          state.isLoading=false
        }
      
    }
})

export const {removeAlert,logoutUser,deleteUserImage,changeLight} = userSlice.actions

export default userSlice.reducer