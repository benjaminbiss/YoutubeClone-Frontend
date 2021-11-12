import React from 'react';
import { Component } from 'react';

class Replies extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment_pk: '',
            likes: 0,
            dislikes: 0,
            video_id: '',
            reply: ''
        }
    }

    handlesChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.makeNewReply(this.state)
    }

    

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type='text' name='reply' onChange={this.handlesChanges} />
                <button type='submit'>Add reply</button>
            </form>
        )
    }
}
export default Replies