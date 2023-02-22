import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogSlice";
import { Link } from "react-router-dom";
import { getBlogId ,changeVotes} from "../features/blogSlice";
import {BsArrowUpCircle}  from "react-icons/bs"
import {BsArrowDownCircle}  from "react-icons/bs"
import "./AllBlogs.css";
const AllBlogs = () => {
  let { Blogs, isLoading } = useSelector((state) => state.blog);
  let { user} = useSelector((state) => state.store);
  let { light } = useSelector((state) => state.store);
  let dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBlogs());
  }, []);

//   if (isLoading) {
//     return <h5>Loading...</h5>;
//   }

  console.log(light)
  return (
    <div className="blogsMain">
      {Blogs.map((blog) => {
        const date = new Date(blog.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return (
            <div>
            <div className="singleBlogMain">
              <img src={blog?.image} style={{ marginTop: "40px" }} />
              <div className="blogContent">
                <Link
                  to={`/blog/${blog._id}`}
                  onClick={() => dispatch(getBlogId(blog?._id))}
                  >
                <h4 style={{ color:"blue"}}>{blog?.title}</h4>
                    </Link>
                    <div className="grid-even-2" style={{alignItems:"center",marginTop:"40px"}}>
                  <img src={blog.user.image} style={{height:"60px",width:"60px",borderRadius:"50%"}}/>
                  <p>{formattedDate}</p>
                    </div>
                  {/* <h5 style={{ color: "gray",margin:"0px"}}>{blog?.user.firstName}</h5> */}
                <p>{blog.description.slice(0, 100)}...</p>
                <div style={{display:"flex",alignItems:"center",gap:"30px",marginTop:"10px"}}>
                {
                    blog.votes.includes(user._id)?<BsArrowUpCircle style={{fontSize:"30px",marginTop:"10px",marginLeft:'10px'}} onClick={()=>dispatch(changeVotes(blog._id))}/>:<BsArrowDownCircle style={{fontSize:"30px",marginTop:"10px",marginLeft:'10px'}} onClick={()=>dispatch(changeVotes(blog._id))}/>
                }
                <p>{blog.votes.length} Votes</p>
                </div>
              </div>
            </div>
      </div>
        );
      })}
    </div>
  );
};

export default AllBlogs;
