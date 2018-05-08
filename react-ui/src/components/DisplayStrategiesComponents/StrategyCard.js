import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

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
                <h1>{mapName+ ' ' + strategyName}</h1>
                <h2>Summary: {strategySummary}</h2>
                <h2>Explanation: {strategyExplanation}</h2>
                <h2>ID: {strategyId}</h2>
                <h2>Type: {strategyType}</h2>
                <h2>Created: {strategyCreated}</h2>
                
            </div>
        );
    };
};