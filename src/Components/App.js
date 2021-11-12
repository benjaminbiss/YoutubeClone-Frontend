import React from 'react';
import axios from 'axios';
import { googleapikey } from './keys';
import Comments from './Comments/Comments';
import { Component } from 'react';
import './App.css'
import CommentTable from './CommentTable/CommentTable';
import VideoList from './VideoList/VideoList';
import Header from './Header/Header';
import Replies from './Replies/Replies';


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
            query: ''

        }
    }

    componentDidMount(){
        this.getComments();
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

    render(){
        return(
            <div>
                <div class='videoHeader'>
                    <Header getVideos={this.getVideos} handlesChanges={this.handleSubmit} handleSubmit={this.handleSubmit}/>
                </div>
                <div class='videoPlayer'>
                    {/* <EmbededVideo /> */}
                    <iframe width="800px" height="600px" src="https://www.youtube.com/embed/DxfEbulyFcY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div>
                    <VideoList videos={this.state.videos}/>
                </div>
                <div class="videoFooter">
                    <h2>Title: {this.state.shownVideoTitle}</h2>
                    <p>Video Details: {this.state.shownVideoDetail}</p>
                </div>
                <div class='comments'>
                    <Comments makeNewComment={this.addComment} />
                    <CommentTable comments={this.state.comments} like={this.like} dislike={this.dislike} replies={this.state.replies} makeNewReply={this.addReply}/>
                    
                </div>
            </div>
            )
    }
}
export default App