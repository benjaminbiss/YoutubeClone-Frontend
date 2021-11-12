import React, { Component } from 'react';
import axios from 'axios';
import { googleapikey } from '../keys';

class  SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    getVideos = async () => {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${googleapikey}&part=snippet&type=video&relatedToVideoId=${this.props.shownVideoID}`);
        this.setState({
                shownVideoID: response.data.items[0].id,
                shownVideoTitle: response.data.items[0].snippet.title,
                shownVideoThumbnail: response.data.items[0].snippet.thumbnails.default.url
            });
        console.log(response)
    }

    render() { 
        return (  
            <div>

            </div>
        );
    }
}
 
export default SearchBar;