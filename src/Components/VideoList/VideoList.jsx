import React, { Component } from 'react';
import './VideoList.css'


class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='videoTable'>
            <table>
                <tr>
                    <th>Videos</th>
                </tr>
                {this.props.videos.map((items) => {
                    return (
                        <tr>
                            <button class="button videobutton" onClick={() => this.props.findVideo(items.id.videoId)}>
                                <td>{items.snippet.title}</td>
                                <iframe width="130px" height="100px" src={items.snippet.thumbnails.default.url}></iframe>
                            </button>
                        </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}
 
export default VideoList;