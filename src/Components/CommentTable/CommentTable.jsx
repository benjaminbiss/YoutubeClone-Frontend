import React, { Component } from 'react';
import Replies from '../Replies/Replies';


function CommentTable(props){

    return(
        <div className='table'>
            <table className='commentTable' >
                <tr>
                </tr>
                {props.comments.map((comment) => {
                    if (comment.video_id === props.baseVideo) {
                        
                        return (
                            <tr>
                            <tr>
                                <td>{comment.comment}</td>
                                <td><button onClick={() => props.getReplies(comment.id)}>View Replies</button></td>
                                <td>{comment.likes}</td>
                                <td>{comment.dislikes}</td>
                                <td><button onClick={() => props.like(comment)}>Like</button></td>
                                <td><button onClick={() => props.dislike(comment)}>Dislike</button></td>
                                <td><button onClick={() => props.deleteComment(comment.id)}>Delete</button></td>
                                <td><Replies comment_pk={comment.id} makeNewReply={props.makeNewReply}/></td>
                            </tr>
                            {props.reply.map((reply) => {
                                if (reply.comment_pk === comment.id) {
                                    return (
                                        <tr className='reply'>
                                            <td></td>
                                            <td>{reply.reply}</td>
                                        </tr>
                                        
                                        )
                                    }
                                })}
                        </tr>
                    )
                }
                })}
            </table>
        </div>
    )
}
export default CommentTable;