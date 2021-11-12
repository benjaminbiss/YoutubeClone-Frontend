import React, { Component } from 'react';


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
                            <td>{items.snippet.title}</td>
                            <iframe width="100px" height="100px" src={items.snippet.thumbnails.default.url}></iframe>
                        </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}
 
export default VideoList;