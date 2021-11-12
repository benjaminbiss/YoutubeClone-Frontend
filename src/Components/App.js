import React from 'react';
import axios from 'axios';
import { googleapikey } from './keys';
import Comments from './Comments/Comments';
import { Component } from 'react';
import Header from './Header/Header';
import './App.css'
import CommentTable from './CommentTable/CommentTable';


class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            comments: [],
            shownVideoID: '',
            shownVideoTitle: '',
            shownVideoDetail: ''

        }
    }

    componentDidMount(){
        this.getComments();
        this.getVideoDetials();
    }

    setMount(){
        this.addComment();
        this.like();
        this.dislike();
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
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${googleapikey}&part=snippet&type=video&id=M576WGiDBdQ`);
        this.setState({
                shownVideoID: response.data.items[0].id,
                shownVideoTitle: response.data.items[0].snippet.title,
                shownVideoDetail: response.data.items[0].snippet.description,
        });
        console.log(response)
    }

    render(){
        return(
            <div>
                <Header />
                <div class='videoPlayer'>
                    {/* <EmbededVideo /> */}
                    <iframe width="800px" height="600px" src="https://www.youtube.com/embed/DxfEbulyFcY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div>
                    <h2>Title: {this.state.shownVideoTitle}</h2>
                    <p>Video Details: {this.state.shownVideoDetail}</p>
                </div>
                <div class='comments'>
                    <Comments makeNewComment={this.addComment} />
                </div>
                <CommentTable comments={this.state.comments} like={this.like} dislike={this.dislike}/>
            </div>
            )
    }
}
export default App