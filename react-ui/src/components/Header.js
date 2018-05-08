import React, { Component }     from 'react';
import ReactDOM         from 'react-dom';
import {App}            from '../index';
import '../styles/index.css';
import { Link} from 'react-router-dom';
import {Bootstrap, Navbar, NavDropdown, MenuItem, Nav, NavbarHeader, NavItem} from 'react-bootstrap';
// require("react-bootstrap/lib/NavbarHeader")
// import {Navbar, NavItem, Icon} from 'react-materialize'; // Will use someday

export class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMap: 'Current map'
        }
    }

    burgerToggle = () => {
        let linksEl = document.querySelector('.narrowLinks');
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }

    render(){
        return(
            <nav>
            <div className="navWide">
                <div className="wideDiv">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
                <div className="narrowLinks">
                    {/* <Link to={'/'} className="navbarLink">Home</Link>
                    <Link to={this.props.mapName} className="navbarLink">{this.props.mapName}</Link>  
                    <Link to={this.props.mapName} className="navbarLink">{this.props.mapName}</Link>                  <a href="#" onClick={this.burgerToggle}>Link 3</a> */}
                </div>
            </div>
        </nav>
        )
    }
}
    