import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ReactDOM         from 'react-dom';
import {App}            from '../index';
// import '../styles/Toptable.css';
import '../styles/index.css';
import { AddStrategyButton } from './AddStrategyButton';
import { ClearFilterButton } from './ClearFilterButton';
import { FilterDisplay } from './FilterDisplay';
import { FilterButton } from './FilterButton';

export class TopTable extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
    }

    render(){

        return(
            <div className="tableContainer">
                <h1>{this.props.currentMap}</h1>
                <AddStrategyButton />
                <ClearFilterButton />
                <FilterDisplay filter="Mirage"/>
                <FilterButton />
            </div>
        )
    }
}