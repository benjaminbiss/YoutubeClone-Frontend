import React, { Component } from "react";
import "./Header.css";
import axios from 'axios';
import { googleapikey } from '../keys';


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




    render() { 
 
  return (
    
  );
}
}
export default Header;
