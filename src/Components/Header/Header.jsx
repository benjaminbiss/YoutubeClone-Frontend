import React, { Component } from "react";
import "./Header.css";
import axios from 'axios';
import { googleapikey } from '../keys';
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import logo from "../logo.svg";
import devCodeCampLogo from "../devCodeCampLogo.png";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        videos: [],
        shownVideoID: '',
        shownVideoTitle: '',
        shownVideoDetail: '',
        query: ''
        }
    }
    handlesChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.getVideos();
    }
    getVideos = async () => {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${this.state.query}&type=video&key=${googleapikey}&part=snippet`);
        this.setState({
              videos: response.data.items,
            });
        console.log(this.state.videos)
    }



    render() { 
 
  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon style={{ color: "white" }} />
        
          <img className="header__logo" src={logo} alt="" />
        
      </div>
      <div className="header__input">
          <form onSubmit={this.props.handleSubmit}>
          <input type='text' name='query' onChange={this.props.handlesChanges} style={{
            flex: 1,
            border: "none",
            padding: "8.3px 20px",
            width: "30vw",
            backgroundColor: "#131313",
            color: "white",
            fontSize: "16px",
          }}/>
          <button type='submit'>
          <SearchIcon
            style={{ color: "#9b9b9b", padding: "4px 8px" }}
          /> </button>  
          </form>
        
          
      </div>
      <div className="header__right">
        <VideoCallIcon style={{ color: "white", marginLeft: "10px" }} />
        <AppsIcon style={{ color: "white", marginLeft: "20px" }} />
        <NotificationsIcon style={{ color: "white", marginLeft: "20px" }} />
        <Avatar
          style={{ height: "30px", width: "30px", marginLeft: "20px" }}
          className="avatar"
          src={devCodeCampLogo}
          alt=""
        />
      </div>
    </div>
  );
}
}
export default Header;
