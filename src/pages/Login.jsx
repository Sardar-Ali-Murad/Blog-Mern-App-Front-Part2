import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/FormRow";
import "./Login.css";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import {setupUserLoginApi,removeAlert}  from "../features/userSlice"
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate=useNavigate()
  let {showAlert,user}=useSelector((state)=>state.store)
  let dispatch = useDispatch();
  let [data, setData] = React.useState({
    email: "",
    password: "",
  });

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
    dispatch(setupUserLoginApi(data))
    setTimeout(()=>{
       dispatch(removeAlert())
    },2000)
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
      
      <button className="btn loginBtn" onClick={submit}>Submit</button>
      <p className="newHere">New Here <Link to="/register"><span className="underlineText">Register</span></Link></p>
    </Card>
  );
};

export default Login;
