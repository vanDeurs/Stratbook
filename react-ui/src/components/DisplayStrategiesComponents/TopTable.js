import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ReactDOM         from 'react-dom';
import {App}            from '../../index';
import '../../styles/index.css';
import { AddStrategyButton } from './AddStrategyButton';
import { ClearFilterButton } from './ClearFilterButton';
import { FilterDisplay } from './FilterDisplay';
import { FilterButton } from './FilterButton';
import { SearchBar } from './SearchBar';
import { SortButton } from './SortButton';

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
                <div className="topTableLeft"> 
                    <AddStrategyButton />
                    <FilterDisplay filter="Mirage"/>
                </div>
                <div className="topTableMiddle"> 
                    <SearchBar />
                    <ClearFilterButton />
                </div>
                <div className="topTableRight"> 
                    <FilterButton />
                    <SortButton />
                </div>
            </div>
        )
    }
}