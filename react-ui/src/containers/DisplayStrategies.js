import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// import '../styles/Mapstrategies.css';
import '../styles/index.css';

// Images
import miragehd         from '../images/hd/miragehd.jpg';
import trainhd          from '../images/hd/trainhd.jpg';
import infernohd        from '../images/hd/infernohd.jpg';
import nukehd           from '../images/hd/nukehd.jpg';
import cachehd          from '../images/hd/cachehd.jpg';
import overpasshd       from '../images/hd/overpasshd.png';
import cobblestonehd    from '../images/hd/cobblestonehd.jpg';
import dust2hd          from '../images/hd/dust2hd.png';

// import {index}            from '../index';

import {MiddlePicker}   from '../containers/MiddlePicker';
import {TopTable} from '../components/DisplayStrategiesComponents/TopTable';


import Home             from '../Home'


import ReactDOM         from 'react-dom';
import { Link }         from 'react-router-dom';
import {App}            from '../index';
import { StrategyCard } from '../components/DisplayStrategiesComponents/StrategyCard';
import { error } from 'util';

export class DisplayStrategies extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMap: null,
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
                <TopTable currentMap={this.state.currentMap}/>
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