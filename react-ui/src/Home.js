import React, { Component } from 'react';
import { Mapcard } from './components/mapCard';
import ReactDOM from 'react-dom';
import {RenderMao} from './components/RenderMap'
import './styles/App.css';
// import '../styles/index.css';
import App from './index';
// Images
import cache from './images/cache.jpg';
import mirage from './images/mirage.jpg';
import inferno from './images/inferno.jpg';
import nuke from './images/nuke.jpg';
import train from './images/train.jpg';
import dust2 from './images/dust2.jpg';
import cobble from './images/cobble.jpg';
import overpass from './images/overpass.jpg';

import { Link } from 'react-router-dom';


export class Home extends Component {

  render() {

    // Array of map names.
    let maps = ['train', 'cache', 'overpass', 'mirage', 'nuke', 'cobblestone', 'inferno', 'dust2'];
    // Array of map images.
    let mapImages = [train, cache, overpass, mirage, nuke, cobble, inferno, dust2];
    // Function that returns each map name and map image in the component <MapCard/>.
    let renderMapCards = () => {
      return maps
          .map((map, index) => {
              return <Mapcard mapName={map} src={mapImages[index]} key={index}/>
          })
    }

    // Returns a container with all the map components.
    return ( 
      <div className="container"> 
        {renderMapCards()}
      </div>
    );
  }
}
