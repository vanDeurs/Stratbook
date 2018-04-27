import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import '../styles/index.css';

import {MiddlePicker}   from '../containers/MiddlePicker';
import {TopTable} from '../components/DisplayStrategiesComponents/TopTable';
import ReactDOM         from 'react-dom';
import { Link }         from 'react-router-dom';
import {App}            from '../index';
import { StrategyCard } from '../components/DisplayStrategiesComponents/StrategyCard';
import { error } from 'util';

export class DisplayStrategies extends Component {
    constructor(props){
        super(props);
        this.state = {
            strategies: [],
            loading: true,
        }
    }

    componentDidMount(){
        this.fetchStrategies();
    };

    // We fetch the data from the API
    fetchStrategies = () => {
      fetch('/:map/strategies')
      .then(res => res.json())
        .catch(console.log(error))
          .then(strategies => this.setState({strategies, loading: false}, () => {
      })
    ).catch(console.log(error))
  }

  // This function goes through the data that is stored in the state.
  // And then returns a card component for each strategy
  renderStrategyCards = () => {
    const {strategies} = this.state
    return strategies
        .map((strategy, index) => {
            return (
              <StrategyCard 
                mapName={strategies[index].map} 
                strategyName={strategies[index].name}  
                key={index} 
                strategySummary={strategies[index].summary}
              />
            )
        })
  }

    render(){
        return(
            <div className="strategiesContainer">
              <div className="top">
                <TopTable/>
              </div>
              <div className="bottom">
              {
                this.state.loading 
                ? <h1>Loading..</h1>
                : this.renderStrategyCards()
              }
              </div>
            </div>
        )
    }
}