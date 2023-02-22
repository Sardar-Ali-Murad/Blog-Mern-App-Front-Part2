import React from 'react'
import {BsFillMoonFill}  from "react-icons/bs"
import {IoIosNotificationsOutline}   from "react-icons/io"
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {changeLight}  from "../features/userSlice"
import {CiDark}  from "react-icons/ci"
import {AiOutlineLogout}  from "react-icons/ai"
import {logoutUser}  from "../features/userSlice"
import {IoMdCreate}  from "react-icons/io"

const Headers = () => {
  let dispatch=useDispatch()
  let {light}=useSelector((state)=>state.store)

    function logout(){
      dispatch(logoutUser())
      localStorage.removeItem("user")
  localStorage.removeItem("token")
    }
  return (
    <div className='headersMain' style={{background:!light?"black":"",color:!light?"white":"",boxShadow:!light?"2px 2px 2px white":""}}>
      <div className='headersPart1'>
        <Link to="/">
      <h4>BlogoPedia</h4>

        </Link>
      </div>
        <AiOutlineLogout className='headersIcons smallLogout' onClick={logout}/>

      <div className='headersPart2' >
        {
          light?
          <BsFillMoonFill className='headersIcons' onClick={()=>dispatch(changeLight())}/>:
          <CiDark className='headersIcons' onClick={()=>dispatch(changeLight())}/>
        }
        {/* <TfiComments  className='headersIcons'/> */}
        <Link to="/createBlog" >
        <IoMdCreate  className='headersIcons'  style={{color:light?"black":'white'}}/>
        </Link>
        <IoIosNotificationsOutline  className='headersIcons'/>
        <AiOutlineLogout className='headersIcons' onClick={logout}/>
      </div>
        
    </div>
  )
}

export default Headers
