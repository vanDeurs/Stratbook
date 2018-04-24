import React, { Component }     from 'react';

import ReactDOM         from 'react-dom';
import {App}            from '../../index';
import '../../styles/index.css';


export class SortButton extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
    }

    render(){

        const {
            something
        } = this.props

        return(
            <div className="sortButton">
                <p className="sortbutton">Sort</p>
            </div>
        )
    }
}