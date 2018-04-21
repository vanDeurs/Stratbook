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
import { MapSetups } from '../containers/MapSetups';


// Stateless Component Function
// Checks if the url contains the map name, and then returns 
// the Middlepicker component with the prop background that is the current map.
export const RenderSetups = ({location}) => {
    const pathName = location.pathname;
    let maps = ['train', 'cache', 'overpass', 'mirage', 'nuke', 'cobblestone', 'inferno', 'dust2'];
    let mapImages = [trainhd, cachehd, overpasshd, miragehd, nukehd, cobblestonehd, infernohd, dust2hd];

    for(let i = 0; i < maps.length; i++ ){
        if (pathName == '/' + maps[i] + '/setups'){
            return (
                <MapSetups map={maps[i]}/>
            )
        }
    }
}