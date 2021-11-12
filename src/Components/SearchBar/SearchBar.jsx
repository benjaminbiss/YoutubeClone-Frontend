import React, { Component } from 'react';
import axios from 'axios';


class  SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  

            <div className='table'>
                <table>
                    <tr>
                        <th>Videos</th>
                    </tr>
                    {/* {this.props.videos.map((videos) => { */}
                        return (
                            <tr>
                                <td>{this.props.videos}</td>
                            </tr>
    
                        )
                    })}
                </table>
            </div>
        )
    }
}
 
export default SearchResults;