import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Card from "@mui/material/Card";
import "./UserInfo.css";
import { RxAvatar } from "react-icons/rx";
import { GoLocation } from "react-icons/go";
import { BsBag } from "react-icons/bs";
import {CiTwitter}  from "react-icons/ci"
import {SlSocialLinkedin}  from "react-icons/sl"
import { useSelector } from "react-redux";
const UserInfo = ({ user }) => {
  let {light,user:currentUser}=useSelector((state)=>state.store)
  return (
    <Card className="userInfoMain singleCard"  style={{background:!light?"black":"",color:!light?"white":"",border:!light?"2px solid white":""}}>
      {/*  */}
      <div>
        <div className="userIntro">
          <div className="introStart">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {user.firstName.slice(0, 1)[0]}
            </Avatar>
            <div>
              <h5>{user.firstName}</h5>
              <p>10 Friends</p>
            </div>
          </div>
          {/* <RxAvatar className="userIcon" /> */}
          <img src={currentUser.image} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
        </div>
      </div>
      <div className="lines"></div>
      {/*  */}

      <div className="userFurtherDetails">
        <div className="flexBox">
          <GoLocation />
          <p className="light">You Location Here</p>
        </div>
        <div className="flexBox">
          <BsBag />
          <p className="light">{user.title}</p>
        </div>
      </div>
      {/*  */}

      <div>
        <div className="flexBox">
            <p>How Viewd Your Profile</p>
            <p className="paraBold">2232e2</p>
        </div>
        <div className="flexBox">
            <p>Impresssion of your post</p>
            <p className="paraBold">2232e2</p>
        </div>
      </div>
      <div className="lines"></div>
      {/*  */}

      <div className="social">
        <h4>Social Profiles</h4>
        <div>
            <div className="flexBox">
            <CiTwitter className="icons"/>
            <div>
                <h7>Twitter</h7>
                <p>Twitter Network</p>
            </div>
            </div>
            <div className="flexBox">
            <SlSocialLinkedin className="icons"/>
            <div>
                <h7>Linkedin</h7>
                <p>Twitter Profile</p>
            </div>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
