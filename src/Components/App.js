import React from 'react';
import axios from 'axios';
import { googleapikey } from './keys';
import Comments from './Comments/Comments';
import { Component } from 'react';
import './App.css'
import CommentTable from './CommentTable/CommentTable';
import VideoList from './VideoList/VideoList';
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import logo from "./logo.svg";
import './Header/Header.css'


class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            comments: [],
            reply: [],
            videos: [],
            shownVideoID: '',
            shownVideoTitle: '',
            shownVideoDetail: '',
            query: '',
            baseVideo: 'DxfEbulyFcY',
        }
    }

    componentDidMount(){
        this.getComments();
        this.getReplies();
        this.getVideoDetials();
        this.getDefaultVideos();
    }

    setMount(){
        this.addComment();
        this.like();
        this.dislike();
        this.addReply();
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

    getComments = async () => {
        let response = await axios.get("http://127.0.0.1:8000/comment/");
        this.setState({
            comments: response.data
        });
    }

    addComment = async (text) => {
        let response = await axios.post("http://127.0.0.1:8000/comment/", text);
        this.getComments()
    }

    getReplies = async () => {
        let response = await axios.get("http://127.0.0.1:8000/reply/");
        this.setState({
            reply: response.data
        });
    }

    addReply = async (text) => {
        let response = await axios.post("http://127.0.0.1:8000/reply/", text);
        this.getReplies()
    }

    like = async (comment) => {
        let updateComment = comment;
        updateComment.likes++;
        let response = await axios.put('http://127.0.0.1:8000/comment/'+comment.id+'/', updateComment);
        this.getComments()
    }

    dislike = async (comment) => {
        let updateComment = comment;
        updateComment.dislikes++;
        let response = await axios.put('http://127.0.0.1:8000/comment/'+comment.id+'/', updateComment);
        this.getComments()
    }

    getVideoDetials = async () => {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${googleapikey}&part=snippet&type=video&id=DxfEbulyFcY`);
        this.setState({
                shownVideoID: response.data.items[0].id,
                shownVideoTitle: response.data.items[0].snippet.title,
                shownVideoDetail: response.data.items[0].snippet.description,
        });
        console.log(response)
    }

    getVideos = async () => {
        console.log(this.state.query)
          let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${this.state.query}&type=video&key=${googleapikey}&part=snippet`);
          this.setState({
                videos: response.data.items,
              });
          console.log(this.state.videos)
      }

    getDefaultVideos = async () => {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=DxfEbulyFcY&type=video&key=${googleapikey}&part=snippet`);
        this.setState({
              videos: response.data.items,
            });
        console.log(this.state.videos)
    }

    findVideo = (videoId) => {
        console.log(videoId);
        this.setState({
            baseVideo : videoId
        })
    }

    changeVideo = () => {
        let url = 'https://www.youtube.com/embed/';
        let baseVideo = this.state.baseVideo;
        return (
            <iframe width="1400rem" height="800rem" src={url + baseVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        )
    }


    render(){
        return(
            <div>
                <div className='videoHeader'>
                <div className="header">
                    <div className="header__left">
                        <MenuIcon style={{ color: "white" }} />
                        
                        <img className="header__logo" src={logo} alt="" />
                        
                    </div>
                    <div className="header__input">
                        <form onSubmit={this.handleSubmit}>
                        <input type='text' name='query' onChange={this.handlesChanges} style={{
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
                        src=""
                        alt=""
                        />
                    </div>
                    </div>
                </div>
                <div className='videoContainer'>
                    <div className='videoPlayerLayer'>
                        <div className='videoPlayer'>
                        <this.changeVideo/>
                        </div>
                    </div>
                    <div>
                        <VideoList videos={this.state.videos} findVideo={this.findVideo}/>
                    </div>
                </div>
                <div className="videoFooter">
                    <h2>Title: {this.state.shownVideoTitle}</h2>
                    <p>Video Details: {this.state.shownVideoDetail}</p>
                </div>
                <div className='comments'>
                    <Comments makeNewComment={this.addComment} />
                    <CommentTable comments={this.state.comments} like={this.like} dislike={this.dislike} reply={this.state.reply} makeNewReply={this.addReply}/>
                    
                </div>
            </div>
            )
    }
}
export default App