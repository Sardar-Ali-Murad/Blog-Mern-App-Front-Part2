import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleBlog } from "../features/blogSlice";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { delBlog, editBlogChanges, getBlogId } from "../features/blogSlice";
import { Link } from "react-router-dom";
const SingleBlogCom = () => {
  let { blogId } = useParams();
  let { isLoading, Blog } = useSelector((state) => state.blog);
  let { user: currentUser,light } = useSelector((state) => state.store);
  let dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(SingleBlog(blogId));
  }, []);
  if (isLoading) {
    return <h5>Loading...</h5>;
  }

  function del() {
    dispatch(delBlog(Blog._id));
  }
  console.log(Blog.image);

  function edit() {
    dispatch(
      editBlogChanges({
        title: Blog.title,
        summary: Blog.summary,
        description: Blog.description,
        image: Blog.image,
      })
    );
    dispatch(getBlogId(Blog._id));
  }
  return (
    <div style={{background:light?'':"black",color:light?'balck':"white"}}>
      <img
        src={Blog?.image}
        style={{ height: "40vh", width: "100%", objectFit: "cover" }}
      />
      <div className="div-center-80" style={{ marginTop: "30px" }}>
        <h3>
          {Blog?.title}
          <span style={{ color: "red" }}>({Blog?.user?.firstName})</span>
        </h3>
        <h5>{Blog?.summary}</h5>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            margin: "40px 0px",
          }}
        >
          <img
            src={Blog?.user?.image}
            style={{ height: "60px", width: "60px", borderRadius: "50%" }}
          />
          {Blog?.user?._id === currentUser?._id && (
            <div style={{ display: "flex", gap: "20px" }}>
              <Link to="/createBlog">
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={edit}
                >
                  Edit
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={del}
                >
                  Delete
                </Button>
              </Link>
            </div>
          )}
        </div>
        <p>{Blog?.description}</p>
      </div>
    </div>
  );
};

export default SingleBlogCom;
