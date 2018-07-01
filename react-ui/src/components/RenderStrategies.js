import React from 'react';
import { DisplayStrategies } from '../containers/DisplayStrategies';


// // Stateless Component Function
// // Checks if the url contains the map name, and then returns 
// // the Middlepicker component with the prop background that is the current map.
export const RenderStrategies = ({location}) => {
    console.log('reached renderStrategies')
    const pathName = location.pathname;
    let maps = ['train', 'cache', 'overpass', 'mirage', 'nuke', 'cobblestone', 'inferno', 'dust2'];
    // let mapImages = [trainhd, cachehd, overpasshd, miragehd, nukehd, cobblestonehd, infernohd, dust2hd];

    for(let i = 0; i < maps.length; i++ ){
        if (pathName === '/' + maps[i]){
            return (
                <DisplayStrategies map={maps[i]}/>
            )
        }
    }
}

