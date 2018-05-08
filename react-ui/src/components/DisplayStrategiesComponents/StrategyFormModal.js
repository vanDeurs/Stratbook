import React, { Component }     from 'react';
import { Button, Form, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import ReactDOM         from 'react-dom';
import '../../styles/index.css';
import Modal from 'react-modal';

// For screen-readers
Modal.setAppElement('#root')

export class StrategyFormModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            mapValue: '',
            nameValue: '',
            summaryValue: '',
            explanationValue: '',
            typeValue: '',
        };
    };

    componentDidMount(){
    };

    ////////////////////////////////////////////////////////////////
    // Handle change functions
    ////////////////////////////////////////////////////////////////


    handleNameChange = (e) => {
        this.setState({
            nameValue: e.target.value
        });
    };

    handleMapChange = (e) => {
        this.setState({
            mapValue: e.target.value
        });
    };

    handleTypeChange = (e) => {
        this.setState({
            typeValue: e.target.value
        });
    };

    handleSummaryChange = (e) => {
        this.setState({
            summaryValue: e.target.value
        });
    };

    handleExplanationChange = (e) => {
        this.setState({
            explanationValue: e.target.value
        });
    };

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    // Runs when the form below is submitted
    onSubmit = (e) => {
        // Prevents page from reloading
        e.preventDefault();
        const {nameValue, mapValue, typeValue, summaryValue, explanationValue} = this.state;
        const formInfo = {
            nameValue,
            mapValue,
            typeValue,
            summaryValue,
            explanationValue
        };
        // This function is passed as a prop to DisplayStrategies.js
        // So that DisplayStrategies.js can access formInfo which is passed in as a parameter.
        // Because DisplayStrategies needs the form info for the StrategyCards.
        this.props.onSubmit(formInfo);
    };


    render(){

        const form = (
            <form onSubmit={this.onSubmit}> 
                <ControlLabel>Strategy Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.nameValue}
                    placeholder="Enter the strategy name"
                    onChange={this.handleNameChange}
                />
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Map</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select" onChange={this.handleMapChange}>
                        <option value="select">Select Map</option>
                        <option value="Mirage">Mirage</option>
                        <option value="Cache">Cache</option>
                        <option value="Dust2">Dust2</option>
                        <option value="Nuke">Nuke</option>
                        <option value="Cobblestone">Cobblestone</option>
                        <option value="Overpass">Overpass</option>
                        <option value="Inferno">Inferno</option>
                        <option value="Train">Train</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsSelectMultiple">
                    <ControlLabel>Type</ControlLabel>
                    <FormControl componentClass="select" onChange={this.handleTypeChange}> {/* Make it a multi-pick in the future. Just add 'multiple' */}
                        <option value="select">Select Type</option>
                        <option value="Fullbuy">Fullbuy</option>
                        <option value="Eco">Eco</option>
                        <option value="Halfbuy">Halfbuy</option>
                        <option value="Pistol">Pistol</option>
                        <option value="All">All</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Summary</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Give a breif summary of the strategy" onChange={this.handleSummaryChange} />
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Detailed explanation</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Explain the strategy in detail. Please use the strategy writing guide for structure" onChange={this.handleExplanationChange}/>
                </FormGroup>

                <Button type="submit">Submit</Button>
            </form>
        );

        // Here we return the modal with the form in it
        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel="Minimal Modal Example"
                onRequestClose={this.props.onRequestClose}
                style={customStyles}
            >
                {form}
            </Modal>
        );
    };
};

const customStyles = {
    content : {
      top                   : '20%',
      left                  : '20%',
      right                 : '20%',
      bottom                : '20%',
    }
  };