import {Header} from './Header';
import {Footer} from './Footer';
import React, {Component} from 'react';

export class Layout extends Component {
    render() {
        return (
            // Pass down current map to header
            <div style={{height: '100%'}}>
                <Header/>
                {this.props.children}
                <Footer />
            </div>
        )
    }
}