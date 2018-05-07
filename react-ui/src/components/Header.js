import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../index';
import '../styles/index.css';
// import {Navbar, NavItem, Icon} from 'react-materialize'; // Will use someday

export const inArray = (val, arr) => {
    for(let i = 0; i < arr.length; i++){
        if(val == arr[i]){
            return true
        } 
    }
    return false
}

export class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMap: 'Current map'
        }
    }

    render(){
        return(
            <div className="navContainer">
                <ul>
                    <li className="navText">CS:GO Stratbook</li>
                    {/* <li>{this.state.currentMap}</li> */}
                </ul>
            </div>
        )
    }
}