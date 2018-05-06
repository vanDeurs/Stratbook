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
import Modal from 'react-modal';

// For screen-readers
Modal.setAppElement('#root')

export class DisplayStrategies extends Component {
    constructor(props){
        super(props);
        this.state = {
            strategies: [],
            loading: true,
            textDisplay: 'Loading...',
            addStrategyModalVisible: false,
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
        .then(res => res.json()
        .then(strategies =>
          this.setState({
            strategies, 
            loading: false
        }))
        .catch(error => {
          this.setState({
            textDisplay: 'Error. Something went wrong.'
          })
          console.log('error2: ', error)
      }))
        .catch(error => {
          this.setState({
            textDisplay: 'Error. Something went wrong.'
          })
          console.log('error1: ', error)
        })
    }

    // fetchStrategies = () => {
    //   const url = '/:map/strategies';
    //   axois.get(url)
    //     .catch(error => 
    //       this.setState({
    //         textDisplay: 'Ops. Something went wrong.\n Check your internet connection and refresh.'
    //     }))
    //     .then(res => {
    //       console.log('response', res);
    //       const strategies = res.data
    //       this.setState({
    //         strategies,
    //         loading: false
    //       })
    //     })
    //     .catch(error => {
    //       console.log('error: ', error)
    //       this.setState({
    //         textDisplay: 'Ops. Something went wrong.\n Check your internet connection and refresh.'
    //       })
    //     })
    // };
              

  // This function goes through the data that is stored in the state.
  // And then returns a card component for each strategy
  renderStrategyCards = () => {
      const {strategies} = this.state
      return strategies.map((strategy, index) => {
          return (
              <StrategyCard 
                  mapName={strategies[index].map} 
                  strategyName={strategies[index].name}  
                  key={index} 
                  strategySummary={strategies[index].summary}
              />
            )
        }
      )
  };

  addStrategyModal = () => {
      return (
        <Modal 
            isOpen={this.state.addStrategyModalVisible}
            contentLabel="Minimal Modal Example"
            onRequestClose={this.closeAddStrategyModal}
            style={customStyles}
        >
            <button onClick={this.closeAddStrategyModal}>Close Modal</button>
        </Modal>
      )
  }

  // Open Add Strategy Modal function
  openAddStrategyModal = () => {
      this.setState({
          addStrategyModalVisible: true
      })
  }

  // Close Add Strategy Modal function
  closeAddStrategyModal = () => {
    this.setState({
        addStrategyModalVisible: false
    })
}

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

const customStyles = {
    content : {
      top                   : '20%',
      left                  : '20%',
      right                 : '20%',
      bottom                : '20%',
    //   marginRight           : '-20%',
    //   transform             : 'translate(-20%, -20%)'
    }
  };