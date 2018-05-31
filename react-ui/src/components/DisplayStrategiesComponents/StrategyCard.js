import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


import ReactDOM         from 'react-dom';
import {App}            from '../../index';
import '../../styles/index.css';

export class StrategyCard extends Component {
    constructor(props){
        super(props)
        this.state = {
        };
    };

    componentDidMount(){
    };

    render(){

        const {
            mapName,
            strategyName,
            strategySummary,
            strategyExplanation,
            strategyId,
            strategyType,
            strategyCreated,
        } = this.props;

        return(
            <div className="strategyCardContainer">
                <i class="fa fa-pencil editStrategyIcon fa-4x"></i>
                <div className="cardTopWrapper">
                    <div className="cardNameDiv"> 
                        <h3 className="cardHeader">Map: </h3>
                        <h3 className="cardData">{mapName}</h3>
                    </div>
                    <div className="cardNameDiv"> 
                        <h3 className="cardHeader">Name: </h3>
                        <h3 className="cardData">{strategyName}</h3>
                    </div>
                    <div className="cardTypeDiv"> 
                        <h3 className="cardHeader">Type: </h3>
                        <h3 className="cardData">{strategyType}</h3>
                    </div>
                </div>
                <div className="cardBottomWrapper">
                    <div className="cardSummaryDiv"> 
                        <h3 className="cardSummaryHeader">Summary: </h3>
                        <h3 className="cardSummaryText">{strategySummary}</h3>
                    </div>
                    <div className="cardCreatedDiv"> 
                        <h3 className="cardCreatedHeader">Created: </h3>
                        <h3 className="cardCreatedSubHeader"> {strategyCreated}</h3>
                    </div>
                </div>
            </div>
        );
    };
};

StrategyCard.propTypes = {
    mapName: PropTypes.string.isRequired,
    strategyName: PropTypes.string.isRequired,
    strategySummary: PropTypes.string.isRequired,
    strategyExplanation: PropTypes.string.isRequired,
    strategyId: PropTypes.number.isRequired,
    strategyType: PropTypes.string.isRequired,
    strategyCreated: PropTypes.string.isRequired,
  };