import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../../index';
import '../../styles/index.css';


export class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <input className="searchBar"type='text' onKeyDown={console.log('keydown')}/>
        )
    }
}