import { googleapikey } from './keys';
import React, { useState } from 'react';
import axios from 'axios';

function App() {



    return (
        <div>
            <h1>Youtube Clone</h1>
            <div>
            <iframe width="800px" height="600px" src="https://www.youtube.com/embed/DxfEbulyFcY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default App;