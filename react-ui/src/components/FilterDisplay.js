import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../index';

import '../styles/index.css';


export class FilterDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
    }

    render(){

        const {
            filter
        } = this.props

        return(
            <div className="filterTypeContainer">
                <p className="filterTypeText">{`Filter: ${this.props.filter}`}</p>
            </div>
        )
    }
}