import {createAsyncThunk,createSlice}  from "@reduxjs/toolkit"

let initialState={
    title:"",
    summary:"",
    description:"",
    blogImage:"",
    isLoading:false,
    showAlert:false,
    alertType:"",
    alertText:"",
    Image:"",
    Blogs:[],
    blogId:"",
    Blog:{},
    edit:false
}


import { createBlogImage,createBlog,allBlogs,getSingleBlog,deleteBlog ,editBlog,Votes} from "./blogsThunk"


export const uploadBlogImage=createAsyncThunk("blog/createBlogImage",async(event,thunkAPI)=>{
    return createBlogImage(event,thunkAPI)
})

export const uploadBlog=createAsyncThunk("blog/createBlog",createBlog)
export const changeBlog=createAsyncThunk("blog/editBlog",editBlog)

export const getBlogs=createAsyncThunk("blog/allBlogs",allBlogs)

export const SingleBlog=createAsyncThunk("blog/getSingleBlog",async (blogId,thunkAPI)=>{
    return getSingleBlog(blogId,thunkAPI)
})

export const delBlog=createAsyncThunk("blog/deleteBlog",async (blogId,thunkAPI)=>{
    return deleteBlog(blogId,thunkAPI)
})


export const changeVotes=createAsyncThunk("blog/Votes",async (blogId,thunkAPI)=>{
    return Votes(blogId,thunkAPI)
})



let blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{
        Title:(state,action)=>{
            state.title=action.payload.value
        },
        Summary:(state,action)=>{
            state.summary=action.payload.value
        },
        Description:(state,action)=>{
            state.description=action.payload.value
        },

        deleteImage:(state)=>{
           state.Image=""
        },
        removeAlert:(state)=>{
         state.showAlert=false
         state.alertText=""
         state.alertType=""
        },
        getBlogId:(state,action)=>{
            state.blogId=action.payload
        },
        editBlogChanges:(state,action)=>{
            state.title=action.payload.title
            state.summary=action.payload.summary
            state.description=action.payload.description
            state.Image=action.payload.image
            state.edit=true
        }
    },
    extraReducers:{
        [uploadBlogImage.pending]:(state)=>{
            state.isLoading=true
        },
        [uploadBlogImage.fulfilled]:(state,{payload})=>{
            state.isLoading=false
            state.Image=payload.data.secure_url
        },
        [uploadBlogImage.rejected]:(state,payload)=>{
            console.log(payload)
            state.isLoading=false
        },
        [uploadBlog.fulfilled]:(state,{payload})=>{
            state.showAlert=true
            state.alertType="success"
            state.alertText="The Blog is added Successfully"
            state.title=""
            state.description=""
            state.summary=""
            state.Image=""
        },
        [uploadBlog.rejected]:(state,{payload})=>{
            console.log(payload)
            state.showAlert=true
            state.alertType="danger"
            state.alertText=payload
        },
        [changeBlog.fulfilled]:(state,{payload})=>{
            state.showAlert=true
            state.alertType="success"
            state.alertText="The Blog is editted Successfully"
            state.title=""
            state.description=""
            state.summary=""
            state.Image=""
            state.edit=false
        },
        [changeBlog.rejected]:(state,{payload})=>{
            state.showAlert=true
            state.alertType="danger"
            state.alertText=payload
        },
        [getBlogs.pending]:(state)=>{
            state.isLoading=true
        },
        [getBlogs.fulfilled]:(state,{payload})=>{
            state.Blogs=payload.Blogs
            state.isLoading=false
        },
       
        [SingleBlog.pending]:(state)=>{
           state.isLoading=true
        },
        [getBlogs.rejected]:(state,payload)=>{
            state.isLoading=false
        },
        [SingleBlog.fulfilled]:(state,{payload})=>{
            state.isLoading=false
            state.Blog=payload.Blog
        }
    }
})


export const {Title,Summary,Description,deleteImage,removeAlert,getBlogId,editBlogChanges} =blogSlice.actions

export default blogSlice.reducer