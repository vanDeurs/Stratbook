import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axois from 'axios';

import '../styles/index.css';

import {MiddlePicker}   from '../containers/MiddlePicker';
import {TopTable} from '../components/DisplayStrategiesComponents/TopTable';
import ReactDOM         from 'react-dom';
import { Link }         from 'react-router-dom';
import {App}            from '../index';
import { StrategyCard } from '../components/DisplayStrategiesComponents/StrategyCard';
import { error } from 'util';
import { StrategyFormModal } from '../components/DisplayStrategiesComponents/StrategyFormModal';

export class DisplayStrategies extends Component {
    constructor(props){
        super(props);
        this.state = {
            strategies: [],
            loading: true,
            textDisplay: 'Loading...',
            addStrategyModalVisible: false,
            formInfo: null,
        }
    }

    componentDidMount(){
        this.fetchStrategies();
    };


    handleErrors = (response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response;
    }
    
    fetchWithErrorHandling = (input, init) => {
      return fetch(input, init)
        .then(this.handleErrors)
    }

    fetchStrategies = () => {
        this.fetchWithErrorHandling('/:map/strategies')
          .then(res => res.json())
          .then(strategies => {
              strategies.forEach(strategy => {
                  strategy.created = new Date (strategy.created)
              })
              this.setState({ strategies, loading: false})
          }).catch(err => {
              console.log(err)
              this.setState({ textDisplay: 'Sorry - something went wrong.' })
          })
      }

      // I am literally a god.
    submitForm = (dataFromForm) => {
        this.setState({formInfo: dataFromForm})
        console.log(console.log(this.state.formInfo))

        fetch('/:map/strategies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataFromForm)
        })
        .then(res => res.json())
        .then(updatedStrategy => {
            updatedStrategy.created = new Date(updatedStrategy.created);
            const newStrategies = this.state.strategies.concat(updatedStrategy);
            this.setState({ strategies: newStrategies })
        }).catch(err => {
            alert('Error in sending data to sercer: ' + err.message);
        })
    };
              

    // This function goes through the data that is stored in the state.
    // And then returns a card component for each strategy
    renderStrategyCards = () => {
        const {strategies} = this.state
        return strategies.map(strategy => {
            console.log('strategies: ', strategies)
            console.log('strategy', strategy.created)
            return (
                <StrategyCard 
                    mapName={strategy.mapValue} 
                    strategyName={strategy.nameValue}  
                    key={strategy.id} 
                    strategySummary={strategy.summaryValue}
                    strategyExplanation={strategy.explanationValue}
                    strategyId={strategy.id}
                    strategyType={strategy.typeValue}
                    strategyCreated={strategy.created.toString()}
                />
                );
            }
        );
    };


  // Modal for adding strategies (and maybe setups)
  addStrategyModal = () => {
      return (
        <StrategyFormModal 
            isOpen={this.state.addStrategyModalVisible}
            onRequestClose={this.closeAddStrategyModal}
            // submitForm={(newStrategyData) => this.submitForm(newStrategyData)}
            onSubmit={this.submitForm}
        />
      )
  };

  // Open Add Strategy Modal function
  openAddStrategyModal = () => {
      this.setState({
          addStrategyModalVisible: true
      })
  };

  // Close Add Strategy Modal function
  closeAddStrategyModal = () => {
    this.setState({
        addStrategyModalVisible: false
    })
};

  // Function that runs when we click the + button
  addStrategyButton = () => {
      this.openAddStrategyModal()
  };

    render(){
        return(
            <div className="strategiesContainer">
                {this.addStrategyModal()}
                <div className="top">
                    <TopTable 
                        addStrategyButton={this.addStrategyButton}
                    />
                </div>
                <div className="bottom">
                { 
                      this.state.loading 
                  ?   <h1>{this.state.textDisplay}</h1>
                  :   this.renderStrategyCards()
                }
                </div>
            </div>
        )
    }
}