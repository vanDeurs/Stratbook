import React, { Component }     from 'react';
import ReactDOM         from 'react-dom';
import {App}            from '../../index';
import { Link }         from 'react-router-dom';
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
                {/* <Link to={`/cache/strategies/add`} style={{flex: 1}}>+</Link> */}
                <h2 className="addStrategyButtonText">+</h2>
            </button>
        )
    }
}