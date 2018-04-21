import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import '../styles/Mapcard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/index.css';

export class Mapcard extends Component {

    render(){

        let backgroundImage = this.props.src;

        return (
            <div 
                className="cardContainer"
                style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className="overlayContainer">
                    <Link to={this.props.mapName} id="mapName">{this.props.mapName}</Link>
                </div>
            </div>
        );
    }

}
Mapcard.propTypes = {
    src: PropTypes.string.isRequired,
    mapName: PropTypes.string.isRequired,
  };