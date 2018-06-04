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
import { EditStrategyFormModal } from '../components/DisplayStrategiesComponents/EditStrategyFormModal';
import {fetchWithErrorHandling, handleErrors } from '../utils/FetchErrorHandling';

export class DisplayStrategies extends Component {
    constructor(props){
        super(props);
        this.state = {
            strategies: [],
            loading: true,
            textDisplay: 'Loading...',
            addStrategyModalVisible: false,
            formInfo: null,
            createdDate: '',
            editStrategyModalVisible: false,

            // Error messages
            mapErrorMessage: null,
            nameErrorMessage: null,
            summaryErrorMessage: null,
            explanationErrorMessage: null,
            typeErrorMessage: null,
        };
    };

    // When the pages has mounted, it fetches the strategies.
    componentDidMount(){
        console.log('Component did mount!')
        this.fetchStrategies();
    };


    //////////////////////////////////////////////////////////////////////
    ///////////////////////// C R U D STARTS HERE/////////////////////////
    //////////////////////////////////////////////////////////////////////

    // Here we use our custom error handler to fetch the data from the backend.
    // The data fetched is the strategies. (could be more in the future)
    fetchStrategies = () => {
        fetchWithErrorHandling('/:map/strategies')
          .then(res => res.json())
          .then(strategies => {
              this.setState({strategies, loading: false});
              console.log('strategies', this.state.strategies);
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
        fetchWithErrorHandling('/:map/strategies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataFromForm)
        })
        .then(res => {
            if (res.ok){
                res.json()
                .then(newStrategy => {
                    const newStrategies = this.state.strategies.concat(newStrategy);
                    this.setState({ 
                        strategies: newStrategies,
                        addStrategyModalVisible: false,
                    })
                })
            } else {
                res.json()
                .then(err => {
                    this.setState({
                        nameErrorMessage: err.message,
                    });
                }).catch(err => {
                    console.log(err.message);
                })
            }
        }).catch(err => {
            this.setState({
                nameErrorMessage: 'Error in sending data to server:' + err.message,
            });
            // alert('Error in sending data to server: ' + err.message);
        });
    };      
    
    // DELETE STRATEGY CARD FUNCTION
    deleteStrategy = (id) => {
        fetchWithErrorHandling(`/:map/strategies/${id}`, {
            method: 'DELETE',
            body: id
        })
        .then(()=> {
            this.fetchStrategies()
        });
    }
    
    
    editStrategy = (newDetails) => {
        let strategyId = 20;
        fetchWithErrorHandling(`/:map/strategies/${strategyId}`, {
            method: 'PUT',
            body: JSON.stringify(newDetails),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => this.fetchStrategies())
    }
    
    
    //////////////////////////////////////////////////////////////////////
    ///////////////////////// C R U D STOPS HERE /////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    // This function goes through the data that is stored in the state.
    // And then returns a card component for each strategy
    renderStrategyCards = () => {
        const {strategies} = this.state;
        
        // Date stuff - move this to a separate function
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; // months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const today = year + "/" + month + "/" + day;
        
        // If there are no strategies - return some sad text
        if (strategies.length < 1){
            return (
                <div className="emptyStrategyList">
                    <h2 className="emptyStrategyListHeader">You don't have any strategies yet</h2>
                    <h3 className="emptyStrategyListSubHeader">Go ahead and add one!</h3>
                </div>
            )
        }
        
        console.log('strategiesxx', this.state.strategies);
        return strategies.map(strategy => {
            const {formEditMode} = this.state;
            // If the strategy created date is the same as the current date
            // We set the created header to "today"
            if (strategy.created === today){
                strategy.created = 'today'
            }
            console.log('strategy', strategy);
            return (
                <StrategyCard 
                    mapName={strategy.mapValue} 
                    strategyName={strategy.nameValue}  
                    key={strategy.id}
                    strategySummary={strategy.summaryValue}
                    strategyExplanation={strategy.explanationValue}
                    strategyId={strategy.id}
                    strategyType={strategy.typeValue}
                    strategyCreated={strategy.created}
                    
                    // Buttons
                    editStrategyButton={this.openOrCloseEditStrategyModal}
                    deleteStrategyButton={() => this.deleteStrategy(strategy.id)}
                />
            );
        }
    );
};

    openOrCloseEditStrategyModal = () => {
        this.state.editStrategyModalVisible 
        ? this.setState({
            editStrategyModalVisible: false
        })
        : this.setState({
            editStrategyModalVisible: true
        })
    }

    // Open Add Strategy Modal function
    openOrCloseAddStrategyModal = () => {
        this.state.addStrategyModalVisible 
        ? this.setState({
            addStrategyModalVisible: false
        })
        : this.setState({
            addStrategyModalVisible: true
        })
    };
    

    // Modal for editing strategies
    editStrategyModal = () => {
        return (
            <EditStrategyFormModal 
                isOpen={this.state.editStrategyModalVisible}
                onEditSubmit={this.editStrategy}
                onRequestClose={this.openOrCloseEditStrategyModal}
                id={20}
            />
        )
    }

    // Modal for adding strategies
    addStrategyModal = () => {
        return (
            <StrategyFormModal 
                isOpen={this.state.addStrategyModalVisible}
                onRequestClose={this.openOrCloseAddStrategyModal}
                onSubmit={this.submitForm}
            />
        )
    };

    render(){
        return(
            <div className="strategiesContainer">
                {this.addStrategyModal()}
                {this.editStrategyModal()}
                <div className="top">
                    <TopTable 
                        addStrategyButton={this.openOrCloseAddStrategyModal}
                    />
                </div>
                <div className="bottom">
                { 
                      this.state.loading 
                  ?    <i className="fa fa-cog fa-spin fa-5x fa-fw loadingIcon"></i>
                  :   this.renderStrategyCards()
                }
                </div>
            </div>
        );
    };
};