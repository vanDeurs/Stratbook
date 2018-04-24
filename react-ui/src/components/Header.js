import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../index';
import '../styles/index.css';


export class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <div className='headerContainer'>
                <h2>header</h2>
            </div>
        )
    }
}