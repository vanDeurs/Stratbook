import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';


export class NotFound extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{height:'85vh', width: '95vw', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Sorry, the page you are looking for doesn't seem to exist.</h1>
            </div>
        )
    }
}