import {Header} from './Header';
import {Footer} from './Footer';
import React, {Component} from 'react';

export class Layout extends Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                <Header/>
                {this.props.children}
                <Footer />
            </div>
        )
    }
}