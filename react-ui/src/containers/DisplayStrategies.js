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

import index            from '../index';

import {MiddlePicker}   from '../containers/MiddlePicker';
import {TopTable} from '../components/DisplayStrategiesComponents/TopTable';


import Home             from '../Home'


import ReactDOM         from 'react-dom';
import { Link }         from 'react-router-dom';
import {App}            from '../index';
import { StrategyCard } from '../components/DisplayStrategiesComponents/StrategyCard';

let fakeServerData = {
  user: {
    name: 'David',
    strategies: [
      {map: 'Mirage', name: 'A-split'},
      {map: 'Cache', name: 'B-rush'},
      {map: 'Train', name: 'Pop-attack'},
      {map: 'Inferno', name: 'Molotov-strat'},
      {map: 'Nuke', name: 'Hut-rush'},
    ],
    setups: [
      {},
      {},
      {},
    ]
  }
}

export class DisplayStrategies extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentMap: null,
            serverData: {},
        }
    }


    componentDidMount(){
        this.getMapPick()
        this.setState({ // Fake loading with setTimeout
          serverData: fakeServerData
        })
    }

    getMapPick = () => {
        let text;
        switch(this.props.map) {
            case "train":
            text = "Train is good!";
              break;
            case "cache":
            text = `I am not a fan of ${this.props.map}.`; // We should run a fetch function to get the strategies/setups from a server!
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



      // Render the strategy cards. Map through the array of strategys.
      let renderStrategyCards = () => {
        const {serverData} = this.state
        return serverData && serverData.user && serverData.user.strategies
            .map((strategy, index) => {
                return <StrategyCard mapName={serverData.user.strategies[index].map} key={index} strategyName={serverData.user.strategies[index].name} strategySummary="Strategy summary whoho"/>
            })
      }

        return(
            <div className="strategiesContainer">
              <div className="top">
                <TopTable currentMap={this.state.currentMap}/>
              </div>
              <div className="bottom">
                {renderStrategyCards()}
              </div>
            </div>
        )
    }
}