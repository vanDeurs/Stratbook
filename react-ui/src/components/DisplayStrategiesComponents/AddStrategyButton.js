import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../../index';
import '../../styles/index.css';

export class AddStrategyButton extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <button type="button" className="addButton" onClick={this.props.onClick}>
                <h2 className="addStrategyButtonText">+</h2>
            </button>
        )
    }
}