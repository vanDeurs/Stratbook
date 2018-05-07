import React, { Component }     from 'react';
import { Button, Form, ControlLabel, FormControl, Radio, Checkbox, FormGroup } from 'react-bootstrap';
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
            typeValue: '',
            createdValue: '',
            value: '',
        }
    };

    componentDidMount(){
        this.setState({
            mapValue: '',
            nameValue: '',
            summaryValue: '',
            typeValue: '',
            createdValue: '',
            value: '',
        })
    }

    handleNameChange = (e) => {
        this.setState({
            nameValue: e.target.value
        });
    }

    handleSummaryChange = (e) => {
        this.setState({
            summaryValue: e.target.value
        });
    }

    render(){

        const form = (
            <form>
                <ControlLabel>Strategy Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.nameValue}
                    placeholder="Enter the strategy name"
                    onChange={this.handleNameChange}
                />
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Map</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select">
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
                    <FormControl componentClass="select" multiple>
                        <option value="select">Select Type</option>
                        <option value="other">Fullbuy</option>
                        <option value="other">Eco</option>
                        <option value="other">Halfbuy</option>
                        <option value="other">Pistol</option>
                        <option value="other">All</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Summary</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Give a breif summary of the strategy" />
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Detailed explanation</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Explain the strategy in detail. Please use the strategy writing guide for structure" />
                </FormGroup>

                <Button type="submit">Submit</Button>
            </form>
        )

        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel="Minimal Modal Example"
                onRequestClose={this.props.onRequestClose}
                style={customStyles}
            >
                {form}
            </Modal>
        )
    }
}

const customStyles = {
    content : {
      top                   : '20%',
      left                  : '20%',
      right                 : '20%',
      bottom                : '20%',
    }
  };