import React, { Component }     from 'react';
import ReactDOM         from 'react-dom';
import {App}            from '../index';
import '../styles/index.css';
import {Link, NavLink} from 'react-router-dom';

export class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMap: 'Current map'
        }
    }

    render(){
        return(
            <nav>
            <div className="navWide">
                <div className="wideDiv">
                    <NavLink to='/' activeClassName='hurray'>Home</NavLink>
                    {/* <NavLink to='/' activeClassName='hurray'>React</NavLink> */}
                    {/* <NavLink to='/react' activeClassName='hurray'>React</NavLink> */}
                </div>
            </div>
            {/* <div className="navNarrow">
                <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
                <div className="narrowLinks">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div> */}
        </nav>
        )
    }
}
    