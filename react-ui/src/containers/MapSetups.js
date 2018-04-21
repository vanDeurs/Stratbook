import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


// Images
import miragehd         from '../images/hd/miragehd.jpg';
import trainhd          from '../images/hd/trainhd.jpg';
import infernohd        from '../images/hd/infernohd.jpg';
import nukehd           from '../images/hd/nukehd.jpg';
import cachehd          from '../images/hd/cachehd.jpg';
import overpasshd       from '../images/hd/overpasshd.png';
import cobblestonehd    from '../images/hd/cobblestonehd.jpg';
import dust2hd          from '../images/hd/dust2hd.png';

import index            from '../index';

import {MiddlePicker}   from '../containers/MiddlePicker';


import Home             from '../Home'


import ReactDOM         from 'react-dom';
import { Link }         from 'react-router-dom';
import {App}            from '../index';


export class MapSetups extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMap: null,
        }
    }

    componentDidMount(){
        this.getMapPick()
    }

    getMapPick = () => {
        let maps = ['train', 'cache', 'overpass', 'mirage', 'nuke', 'cobblestone', 'inferno', 'dust2'];
        let mapImages = [trainhd, cachehd, overpasshd, miragehd, nukehd, cobblestonehd, infernohd, dust2hd];
        let text;
        
        switch(this.props.map) {
            case "train":
            text = "Train is good!";
              break;
            case "cache":
            text = `I am not a fan of ${this.props.map}.`; // We should run a fetch function to get the strategies/setups from the Mongo DB.
              break;
            case "overpass":
            text = `I am not a fan of ${this.props.map}.`; // Todo: Do this but with the setups.
              break;
            case "mirage":
            text = `I am not a fan of ${this.props.map}.`;
              break;
            case "nuke":
            text = `I am not a fan of ${this.props.map}.`;
              break;
            case "cobblestone":
            text = `I am not a fan of ${this.props.map}.`;
              break;
            case "inferno":
            text = `I am not a fan of ${this.props.map}.`;
              break;
            case "dust2":
            text = `I am not a fan of ${this.props.map}.`;
              break;
            // Default
            text = 'Map';
          }
          this.setState({
              currentMap: this.props.map
          })
    }
    render(){

        return(
            <h1>{`I am not a fan of ${this.state.currentMap}`}</h1>
        )
    }
}