import axios from "axios";

import {getBlogs}  from "./blogSlice"
export const createBlogImage = async (event, thunkAPI) => {
    try {
      const imageFile = event.target.files[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "zkkzikta");
      let data=await axios.post("https://api.cloudinary.com/v1_1/dvaodl5k8/image/upload",formData)
      return data
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  };

  export const createBlog= async (_, thunkAPI) => {
    let {title,summary,description,Image} = thunkAPI.getState().blog;
    let {token} = thunkAPI.getState().store;
      
    try {
      let props = await axios.post(`http://localhost:5000/api/v1/blog`,{title,description:description.replace(/<[^>]+>/g, ''),summary,image:Image}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return props.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };


  export const editBlog= async (_, thunkAPI) => {
    let {title,summary,description,Image,blogId} = thunkAPI.getState().blog;
    let {token} = thunkAPI.getState().store;
      
    try {
      let props = await axios.patch(`http://localhost:5000/api/v1/blog/${blogId}`,{title,description:description.replace(/<[^>]+>/g, ''),summary,image:Image}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return props.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };


  export const allBlogs= async (_, thunkAPI) => {
    let {token} = thunkAPI.getState().store;
      
    try {
      let props = await axios.get(`http://localhost:5000/api/v1/blog` ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return props.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };


  export const getSingleBlog= async (blogId, thunkAPI) => {
    let {token} = thunkAPI.getState().store;
    try {
      let props = await axios.get(`http://localhost:5000/api/v1/blog/${blogId}` ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return props.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };

  export const deleteBlog= async (blogId, thunkAPI) => {
    let {token} = thunkAPI.getState().store;
    try {
      let props = await axios.delete(`http://localhost:5000/api/v1/blog/${blogId}` ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(getBlogs())
      return props.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };


  export const Votes= async (blogId, thunkAPI) => {
    let {token} = thunkAPI.getState().store;
    try {
      let props = await axios.get(`http://localhost:5000/api/v1/blog/vote/${blogId}` ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(getBlogs())
      return props.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  };