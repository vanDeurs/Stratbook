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

    componentDidMount() {
        console.log('Component did mount');
        this.setState({
            currentMap: this.props.currentMap
        })

    }

    // maps = ['train', 'cache', 'overpass', 'mirage', 'nuke', 'cobblestone', 'inferno', 'dust2'];
    // mapFinder = () => {
    //     for (let i = 0; i > 9; i++){
    //         if(inArray(this.maps[i], this.maps)){
    //             this.setState({
    //                 currentMap: this.maps[i]
    //             })
    //         } else {
    //             this.setState({
    //                 currentMap: 'Not found',
    //             })
    //         }
    //     }
    // };

    // List values
    listValueOne = 'Home';

    render(){
        return(
            <div className="navContainer">
                <ul>
                    <li>{this.listValueOne}</li>
                    <li>{this.state.currentMap}</li>
                </ul>
            </div>
        )
    }
}