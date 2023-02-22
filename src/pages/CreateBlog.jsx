import React from "react";
import FormRow from "../components/FormRow";
import "./index.css";
import JoditEditor from "jodit-react";
import { Title, Summary, Description } from "../features/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { uploadBlogImage } from "../features/blogSlice";
import Card from "@mui/material/Card";
import { FcDeleteColumn } from "react-icons/fc";
import { deleteImage,uploadBlog,removeAlert } from "../features/blogSlice";
import Alert from "../components/BlogAlert"
import {changeBlog}  from "../features/blogSlice"

const CreateBlog = () => {
  let { title, description, summary, Image, isLoading,showAlert,edit } = useSelector(
    (state) => state.blog
  );  let { light} = useSelector(
    (state) => state.store
  );

  let dispatch = useDispatch();
    //  console.log(title,description.replace(/<[^>]+>/g, ''),summary)

  function handleImage(event) {
    dispatch(uploadBlogImage(event));
  }

  function del() {
    dispatch(deleteImage());
  }

  function post(){
   dispatch(uploadBlog())
   setTimeout(()=>{
      dispatch(removeAlert())
   },3000)
  }
  function editFun(){
   dispatch(changeBlog())
   setTimeout(()=>{
      dispatch(removeAlert())
   },3000)
  }

  return (
    <div style={{background:light?'':"black",color:light?'balck':"white",padding:"20px",paddingBottom:"20px"}}>

    <div className="div-center-80 createBlogMain" >
      <FormRow
        value={title}
        handleChange={(e) => dispatch(Title({ value: e.target.value }))}
        placeholder="Enter the title"
        label="Title"
        name="title"
        />
      <FormRow
        value={summary}
        placeholder="Enter the Summary"
        name="summary"
        label="Summary"
        handleChange={(e) => dispatch(Summary({ value: e.target.value }))}
        />
      <JoditEditor
        value={description}
        tabIndex={1}
        name="description"
        onChange={(e) => dispatch(Description({ value: e }))}
        />
      <input
        type="file"
        className="form-font"
        id="image"
        accept="image/*"
        onChange={handleImage}
        style={{ margin: "30px 0px" }}
        />

      <p>{isLoading && "Loading..."}</p>

      {Image && (
          <Card className="imageCard singleCard">
          <div className="imageBox">
            <img
              src={Image}
              className="image"
              style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              />
            <FcDeleteColumn className="Icons" onClick={del} />
          </div>
        </Card>
      )}
      {
        showAlert && <Alert/>
    }
      {
        !edit?
        <button
        className="btn"
          style={{ width: "130px", marginTop: "30px", height: "40px" }}
          onClick={post}
          >
        Create
      </button>:
          <button
          className="btn"
          style={{ width: "130px", marginTop: "30px", height: "40px" }}
          onClick={editFun}
          >
        Edit
      </button>
    }
        
    </div>
    </div>
  );
};

export default CreateBlog;
