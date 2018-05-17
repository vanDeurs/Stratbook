import React, { Component }     from 'react';
import { Button, Form, ControlLabel, FormControl, FormGroup, FormControlFeedback} from 'react-bootstrap';
import ReactDOM         from 'react-dom';
import '../../styles/index.css';
import Modal from 'react-modal';
import { FormErrors } from '../../utils/FormErrors';
import { checkTextLength } from '../../utils/FormValidation';

// For screen-readers
Modal.setAppElement('#root')

export class StrategyFormModal extends Component {
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
    };

    ////////////////////////////////////////////////////////////////
    // Validation
    ////////////////////////////////////////////////////////////////

    // signupValidation
    formValidation = () => {
        let errors = [];

        const {nameValue, mapValue, typeValue, summaryValue, explanationValue} = this.state;
        const formInfo = {
            nameValue,
            mapValue,
            typeValue,
            summaryValue,
            explanationValue
        };

        let errMsg = {
            nameValue: '',
            mapValue: '',
            typeValue: '',
            summaryValue: '',
            explanationValue: '',
        };
        
        if(!checkTextLength(formInfo.nameValue)){
            errMsg.nameValue = 'A name of the strategy is required';
        }
        if(!(formInfo.mapValue)){
            errMsg.mapValue = 'A map is required';
        }
        if(!(formInfo.typeValue)){
            errMsg.typeValue = 'A type is required';
        }
        if(!checkTextLength(formInfo.summaryValue)){
            errMsg.summaryValue = 'A summary is required';
        }
        if(!checkTextLength(formInfo.explanationValue)){
            errMsg.explanationValue = 'An explanation is required';
        }

        this.setState({
            nameErrorMessage: errMsg.nameValue,
            mapErrorMessage: errMsg.mapValue,
            typeErrorMessage: errMsg.typeValue,
            summaryErrorMessage: errMsg.summaryValue,
            explanationErrorMessage: errMsg.explanationValue,
        });

        // Run if no errors
        console.log('errMsg:', errMsg);
        for (let i in errMsg){
            if(errMsg[i]) { 
                console.log('current err message', errMsg[i]);
                return false;
            } 
            return true;
        }
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

    clearForm = () => {
        this.setState({
            nameValue: '',
            mapValue: '',
            typeValue: '',
            summaryValue: '',
            explanationValue: ''
        })
    }

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

        // We run the front end validation
        const validation = this.formValidation()
        if (!validation){
            console.log('formErr', validation)
            return
        }

        // So that DisplayStrategies.js can access formInfo which is passed in as a parameter.
        // Because DisplayStrategies needs the form info for the StrategyCards.
        this.props.onSubmit(formInfo);

        // Clear form after submit
        this.clearForm()
    };
    
    render(){
        const form = (
            <form onSubmit={this.onSubmit} className="formContainer"> 
                <FormGroup className="formGroup">
                    <ControlLabel className="formHeader">Strategy Name</ControlLabel>
                    <FormControl
                        type="text"
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
                    <p className="formErrorMessage">
                        {this.state.mapErrorMessage}
                    </p>   
               </FormGroup>

                <FormGroup className="formGroup" controlId="formControlsSelectMultiple">
                    <ControlLabel className="formHeader">Type</ControlLabel>
                    <FormControl componentClass="select" onChange={this.handleTypeChange}> {/* Make it a multi-pick in the future. Just add 'multiple' */}
                        <option value="select">Select Type</option>
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
                    <FormControl componentClass="textarea" placeholder="Give a breif summary of the strategy" onChange={this.handleSummaryChange} />
                    <p className="formErrorMessage">
                        {this.state.summaryErrorMessage}
                    </p>   
                </FormGroup>
                
                <FormGroup className="formGroup" controlId="formControlsTextarea">
                    <ControlLabel className="formHeader">Detailed explanation</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Explain the strategy in detail. Please use the strategy writing guide for structure" onChange={this.handleExplanationChange}/>
                    <p className="formErrorMessage">
                        {this.state.explanationErrorMessage}
                    </p>               
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
                className="formModal"
            >
                {form}
            </Modal>
        );
    };
};