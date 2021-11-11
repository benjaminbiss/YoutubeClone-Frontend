import React from 'react';
import { Component } from 'react';

class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: '',
            likes: 0,
            dislikes: 0,
            video_id: ''
        }
    }

    handlesChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.makeNewComment(this.state)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type='text' name='comment' onChange={this.handlesChanges} />
                <button type='submit'>Add Comment</button>
            </form>
        )
    }
}
export default Comments