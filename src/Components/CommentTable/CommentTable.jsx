import React from 'react';
import { Component } from 'react';

function CommentTable(props){
    return(
        <div className='table'>
            <table>
                <tr>
                    <th>Comment</th>
                    <th>Likes</th>
                    <th>Dislikes</th>
                </tr>
                {props.comments.map((comment) => {
                    return (
                        <tr>
                            <td>{comment.comment}</td>
                            <td>{comment.likes}</td>
                            <td>{comment.dislikes}</td>
                        </tr>

                    )
                })}
            </table>
        </div>
    )
}
export default CommentTable;