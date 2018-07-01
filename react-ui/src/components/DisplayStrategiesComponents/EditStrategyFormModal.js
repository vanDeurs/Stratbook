import React, { Component }     from 'react';
import { Button, Form, ControlLabel, FormControl, FormGroup, FormControlFeedback} from 'react-bootstrap';
import ReactDOM         from 'react-dom';
import '../../styles/index.css';
import Modal from 'react-modal';
import { checkTextLength } from '../../utils/TextValidation';
import {fetchWithErrorHandling, handleErrors} from '../../utils/FetchErrorHandling';
import {logError} from '../../utils/Logger';

// For screen-readers
Modal.setAppElement('#root')

export class EditStrategyFormModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Form values 
            mapValue: '',
            nameValue: '',
            summaryValue: '',
            explanationValue: '',
            typeValue: '',

            // Error messages
            mapErrorMessage: '',
            nameErrorMessage: '',
            summaryErrorMessage: '',
            explanationErrorMessage: '',
            typeErrorMessage: '',
        };
    };

    componentDidMount(){
        console.log('Component did mount for editStrategyModal');
    };


    ////////////////////////////////////////////////////////////////
    // Validation
    ////////////////////////////////////////////////////////////////

    // signupValidation
    formValidation = () => {
        const errors = [];

        const {nameValue, mapValue, typeValue, summaryValue, explanationValue} = this.state;
        const formInfo = {
            nameValue,
            mapValue,
            typeValue,
            summaryValue,
            explanationValue
        };

        const errMsg = {
            name: '',
            map: '',
            type: '',
            summary: '',
            explanation: '',
        };
        
        if(!checkTextLength(formInfo.nameValue)){
            errMsg.name = 'A name is required';
        }
        if(!(formInfo.mapValue)){
            errMsg.map = 'A map is required';
        }
        if(!(formInfo.typeValue)){
            errMsg.type = 'A type is required';
        }
        if(!checkTextLength(formInfo.summaryValue)){
            errMsg.summary = 'A summary is required';
        }
        if(!checkTextLength(formInfo.explanationValue)){
            errMsg.explanation = 'An explanation is required';
        }

        this.setState({
            nameErrorMessage: errMsg.name,
            mapErrorMessage: errMsg.map,
            typeErrorMessage: errMsg.type,
            summaryErrorMessage: errMsg.summary,
            explanationErrorMessage: errMsg.explanation,
        });

        // If any errors found, abort and return false.
        // Else, return true.
  
        if (    errMsg.name.length > 0 
            ||  errMsg.map.length > 0 
            ||  errMsg.type.length > 0 
            ||  errMsg.summary.length > 0 
            ||  errMsg.explanation.length > 0){
                console.log('error found, abort.')
                return false;
        }
        console.log('no errors found. continue')
        return true;
    }

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

    fetchStrategyDetails = (strategyId) => {
        console.log('prop id: ', this.props.strategyId)
        // const strategyId = this.props.strategyId;
        fetchWithErrorHandling(`/:map/${strategyId}`)
          .then(res => res.json())
          .then(res => {
              this.setState({
                  mapValue: res.mapValue,
                  nameValue: res.nameValue,
                  typeValue: res.typeValue,
                  summaryValue: res.summaryValue,
                  explanationValue: res.explanationValue
              });
              console.log('map: ', this.state.mapValue);
              console.log('name: ', this.state.nameValue);
              console.log('type: ', this.state.typeValue);
              console.log('summary: ', this.state.summaryValue);
              console.log('explanation: ', this.state.explanationValue);
          }).catch(err => {
              logError('EditStrategyFormModal - fetchStrategyDetails', err);
          });
      };

    // Runs when the form below is submitted
    onSubmit = (e) => {
        console.log('Form has been submitted')
        e.preventDefault();
        const {nameValue, mapValue, typeValue, summaryValue, explanationValue} = this.state;
        const newFormInfo = {
            nameValue,
            mapValue,
            typeValue,
            summaryValue,
            explanationValue
        };

        // We run the front end validation
        const validation = this.formValidation();
        if (!validation){
            console.log('formErr', validation)
            return
        } else {
            console.log('Validation: ', validation);
            // So that DisplayStrategies.js can access formInfo which is passed in as a parameter.
            // Because DisplayStrategies needs the form info for the StrategyCards.
            this.props.onEditSubmit(newFormInfo);
        }
    };
    
    render(){
        const form = (
            <form onSubmit={this.onSubmit} className="formContainer"> 
                <FormGroup className="formGroup">
                    <ControlLabel className="formHeader">Strategy Name</ControlLabel>
                    <FormControl
                        type="text"
                        // required={true}
                        value={this.state.nameValue}
                        placeholder="Enter the strategy name"
                        onChange={this.handleNameChange}
                    />
                    <p className="formErrorMessage">
                        {this.state.nameErrorMessage}
                    </p>   
                </FormGroup>
                <FormGroup className="formGroup" controlId="formControlsSelect">
                    <ControlLabel className="formHeader">Map</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select" onChange={this.handleMapChange}>
                        <option value="select">{this.state.mapValue || "Select map"}</option>
                        <option value="Mirage">Mirage</option>
                        <option value="Cache">Cache</option>
                        <option value="Dust2">Dust2</option>
                        <option value="Nuke">Nuke</option>
                        <option value="Cobblestone">Cobblestone</option>
                        <option value="Overpass">Overpass</option>
                        <option value="Inferno">Inferno</option>
                        <option value="Train">Train</option>
                    </FormControl>
                    <p className="formErrorMessage">
                        {this.state.mapErrorMessage}
                    </p>   
               </FormGroup>

                <FormGroup className="formGroup" controlId="formControlsSelectMultiple">
                    <ControlLabel className="formHeader">Select Type</ControlLabel>
                    <FormControl componentClass="select" onChange={this.handleTypeChange}> {/* Make it a multi-pick in the future. Just add 'multiple' */}
                        <option value="select">{this.state.typeValue || "Select Type"}</option>
                        <option value="Fullbuy">Fullbuy</option>
                        <option value="Eco">Eco</option>
                        <option value="Halfbuy">Halfbuy</option>
                        <option value="Pistol">Pistol</option>
                        <option value="All">All</option>
                    </FormControl>
                    <p className="formErrorMessage">
                        {this.state.typeErrorMessage}
                    </p>                
                    </FormGroup>

                <FormGroup className="formGroup" controlId="formControlsTextarea">
                    <ControlLabel className="formHeader">Summary</ControlLabel>
                    <FormControl componentClass="textarea" value={this.state.summaryValue} placeholder="Give a breif summary of the strategy" onChange={this.handleSummaryChange} />
                    <p className="formErrorMessage">
                        {this.state.summaryErrorMessage}
                    </p>   
                </FormGroup>
                
                <FormGroup className="formGroup" controlId="formControlsTextarea">
                    <ControlLabel className="formHeader">Detailed explanation</ControlLabel>
                    <FormControl componentClass="textarea" value={this.state.explanationValue} placeholder="Explain the strategy in detail. Please use the strategy writing guide for structure" onChange={this.handleExplanationChange}/>
                    <p className="formErrorMessage">
                        {this.state.explanationErrorMessage}
                    </p>               
                    </FormGroup>

                <Button type="submit">Edit and Submit</Button>
            </form>
        );

        // Here we return the modal with the form in it
        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel="Minimal Modal Example"
                onRequestClose={this.props.onRequestClose}
                className="formModal"
                onAfterOpen={() => this.fetchStrategyDetails(this.props.strategyId)}
            >
                {form}
            </Modal>
        );
    };
};