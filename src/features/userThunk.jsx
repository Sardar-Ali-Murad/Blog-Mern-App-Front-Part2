import axios from "axios";

export const setupUserLogin = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(
      `http://localhost:5000/api/v1/auth/${route}`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const setupUserRegister = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(
      `http://localhost:5000/api/v1/auth/${route}`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const userImage = async (event, thunkAPI) => {
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



