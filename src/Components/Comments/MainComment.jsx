import React from 'react';
import React, { Component } from 'react';



let commentCounter = 1; 
class MainComment extends Component{
    constructor(props){
        super(props)

        this.state = {
            commentValue = '',
            commentLine: [{commentId:'', text:''}],
        }
    }

    handleCommentValue = (test) => {
        this.setState({
            commentValue: test.target.value,
        })
    }

    setCommentLine = () => {
        this.setState({
            commentLine: [
                this.state.commentLine,
                {commentId: commentCounter++, text: this.state.commentValue}],
            commentValue: "",
        })
    }

    submitCommentLine = (test) => {
        test.preventDefault();
        this.setCommentLine();
    }

    enterCommentLine = (test) => {
        if (test.charCode === 13){
            this.setCommentLine();
        }
    }

    render(){
        return(
            <CommentBox
            commentValue={this.state.commentValue}
            handleCommentValue={this.handleCommentValue}
            enterCommentLine={this.enterCommentLine}
            submitCommentLine={this.submitCommentLine} />
        )
    }
}

export default MainComment