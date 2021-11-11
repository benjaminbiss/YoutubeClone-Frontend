import { googleapikey } from './keys';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

    const [video, setVideo] = useState();
    const [videoID, setID] = useState();
    const [videoTitle, setTitle] = useState();
    const [videoDetail, setDetail] = useState();
    
    // variables: take out api key and video id
    useEffect(async () => {
        console.log("Noticed Change of video?");
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${googleapikey}&part=snippet&type=video&id=DxfEbulyFcY`)
        setVideo(result.data.items[0])
        setTitle(result.data.items[0].snippet.title)
        setDetail(result.data.items[0].snippet.description)
    }, [])
    

    return (
        <div>
            <h1>Youtube Clone</h1>
            {/* <SearchBar /> */}
            <div>
            <iframe width="800px" height="600px" src="https://www.youtube.com/embed/DxfEbulyFcY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h2>Video: {videoTitle}</h2>
            <p><strong>Details:</strong> {videoDetail}</p>
            </div>
        </div>
    );
}

export default App;