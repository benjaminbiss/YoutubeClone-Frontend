import React from 'react';
import axios from 'axios';
import { googleapikey } from './keys';
import Comments from './Comments/Comments';
import { Component } from 'react';
import Header from './Header/Header';
import './App.css'


class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            comments: []

        }
    }

    setMount(){
        this.getComments();
        this.addComment();
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

    render(){
        return(
            <div>
                <Header />
                <div class='videoPlayer'>
                    <iframe width="800px" height="600px" src="https://www.youtube.com/embed/DxfEbulyFcY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class='comments'>
                    <Comments makeNewComment={this.addComment} />
                </div>

                <div><button onClick={this.getComments}>Click for videos!</button></div>
            </div>
            )
    }
}
export default App