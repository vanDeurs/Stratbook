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
        };
    };

    // When the pages has mounted, it fetches the strategies.
    componentDidMount(){
        this.fetchStrategies();
    };


    // This handles errors
    handleErrors = (response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response;
    };
    
    // This handles fetching errors
    fetchWithErrorHandling = (input, init) => {
      return fetch(input, init)
        .then(this.handleErrors)
    };

    // Here we use our custom error handler to fetch the data from the backend.
    // The data fetched is the strategies. (could be more in the future)
    fetchStrategies = () => {
        this.fetchWithErrorHandling('/:map/strategies')
          .then(res => res.json())
          .then(strategies => {
              strategies.forEach(strategy => {
                  strategy.created = new Date (strategy.created)
              })
              this.setState({ strategies, loading: false});
          }).catch(err => {
              console.log('Err', err);
              this.setState({ textDisplay: 'Sorry - something went wrong.' });
          });
      };

      // I am literally a god.
      // This functions gets run by the prop function in StrategyFormModal.js
      // It is run in the <StrategyFormModal ... /> below.
      // This is so we can access the state in that child.
      // Here we use the createAPI to create a strategy. 
      // The body is the form info that we got from StrategyFormModal.
    submitForm = (dataFromForm) => {
        this.setState({formInfo: dataFromForm});

        // We fetch the data.
        fetch('/:map/strategies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataFromForm)
        })
        .then(res => res.json())
        .then(updatedStrategy => {
            // We "update" the strategy and add a date.
            updatedStrategy.created = new Date(updatedStrategy.created);
            // We make a variable that contains the current strategies stored in state plus the updatedStrategy.
            const newStrategies = this.state.strategies.concat(updatedStrategy);
            // We set the newStrategies to be the strategies.
            this.setState({ strategies: newStrategies })
        }).catch(err => {
            alert('Error in sending data to sercer: ' + err.message);
        });
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


  // Modal for adding strategies
  addStrategyModal = () => {
      return (
        <StrategyFormModal 
            isOpen={this.state.addStrategyModalVisible}
            onRequestClose={this.closeAddStrategyModal}
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
        );
    };
};