import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../index';
import '../styles/index.css';


export class Footer extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <div className="footerContainer">
                <p className="footerText">Handmade by me - Alexander Wilson van Deurs © </p> 
            </div>  
        )
    }
}