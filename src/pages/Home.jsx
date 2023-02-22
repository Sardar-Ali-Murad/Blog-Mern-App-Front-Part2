import React from 'react'
import { useSelector } from 'react-redux'
import { UserInfo } from '../components'
import Blog from "../assets/blog.avif"
import {AllBlogs}  from "../components/index"

const Home = () => {
  let {user,light}=useSelector((state)=>state.store)
  return (
    <div  style={{background:!light?"black":""}}>

    <div className='div-center-80'>
      <div  className="homeFront" style={{gap:"10px"}}>
      <UserInfo user={user} />
      <img src={Blog} style={{height:"400px",marginTop:"40px"}} />
      </div>
      <AllBlogs/>

    </div>
    </div>
  )
}

export default Home
