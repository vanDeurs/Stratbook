import React, { Component } from 'react';
// import { Mapcard } from './components/Mapcard';
import ReactDOM from 'react-dom';
// import {RenderMap} from './components/RenderMap'
import App from '../index';
// Images
// import '../styles/MiddlePicker.css';
import '../styles/index.css';

import miragehd from '../images/hd/miragehd.jpg';

import { Link } from 'react-router-dom';


export class MiddlePicker extends Component {

    render() {
        let background = this.props.backgroundImage

        return ( 
            <div className="middleContainer" style={{backgroundImage: `url(${background})`}}>
                <div className="innerContainer">
                    <Link to={this.props.linkStrategies} className="strategiButton"><h1 className="buttonText">Strategies</h1>
                    <div className="arrow">
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                    </Link>
                    <Link to={this.props.linkSetups} className="setupButton"><h1 className="buttonText">Setups</h1>
                    <div className="arrow">
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                    </Link>
                </div>
            </div>
        );
    }
}
