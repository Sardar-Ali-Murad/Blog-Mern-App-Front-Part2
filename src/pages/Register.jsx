import React from "react";
import {  useDispatch,useSelector } from "react-redux";
import InputField from "../components/FormRow";
import "./Login.css";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom"
import {setupUserRegisternApi,removeAlert}  from "../features/userSlice"
import Alert from "../components/Alert";
import { useNavigate} from "react-router-dom";
import {FcDeleteColumn}  from "react-icons/fc"
import {uploadUserImage,deleteUserImage}  from "../features/userSlice"

const Register = () => {
    let navigate=useNavigate()
    let {userImage,showAlert,user,isLoading}=useSelector((state)=>state.store)
  let dispatch = useDispatch();
  let [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    title: "",
    img: "",
    email: "",
    password: "",
  });
  
  let ImageRef=React.useRef()

  function del(){
    dispatch(deleteUserImage())
    ImageRef.current.value=""
  }

  function handleChange(e) {
    setData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submit(e){
     e.preventDefault()
     dispatch(setupUserRegisternApi({...data,image:userImage}))
    setTimeout(()=>{
        dispatch(removeAlert())
     },3000)
  }

  function handleimage(event) {
    dispatch(uploadUserImage(event));
  }


  React.useEffect(()=>{
    setTimeout(()=>{
        if(user!==null){
            navigate("/")
        }
    },3000)
  },[user])


  
  return (
    <Card className="loginMain div-center-80">
       {showAlert && <Alert/> }
      <div className="firstRow">
        <InputField
          className="input"
          name="firstName"
          value={data.firstName}
          handleChange={handleChange}
          label="First Name"
          type="text"
          placeholder="Enter The First Name"
          />
        <InputField
          name="lastName"
          value={data.lastName}
          handleChange={handleChange}
          label="Last Name"
          type="text"
          placeholder="Enter The Last Name"
          
          />
      </div>
      <InputField
        name="title"
        value={data.title}
        handleChange={handleChange}
        label="Title"
        type="text"
        placeholder="Enter The Title"
        />
      <InputField
        name="email"
        value={data.email}
        handleChange={handleChange}
        label="Email"
        type="text"
        placeholder="Enter The Email"
        />
      <InputField
        name="password"
        value={data.password}
        handleChange={handleChange}
        label="Password"
        type="password"
        placeholder="Enter The Pssword"
        />
         <input
              type="file"
              className="form-font"
              id="image"
              accept="image/*"
              onChange={handleimage}
              ref={ImageRef}
              style={{margin:"30px 0px"}}
            />
            {
              isLoading && <p>Loading...</p>
            }
        {userImage &&
          <Card className="imageCard singleCard">
          <div className="imageBox">
            <img src={userImage} className="image" style={{height:"60px",width:"60px",borderRadius:"50%"}}/>
            <FcDeleteColumn
              className="Icons"
              onClick={del}
              />
          </div>
        </Card>
            }
      <button className="btn loginBtn" onClick={submit}>Submit</button>
      <p className="newHere">Already A Member <Link to="/login"><span className="underlineText">Login</span></Link></p>
    </Card>
  );
};

export default Register;
