import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';
import { Home }                 from './Home.js';
import './styles/index.css';
import { RenderStrategies }     from './components/RenderStrategies';
import { BrowserRouter, Route, HashRouter, Link, Switch, Redirect } from 'react-router-dom';
import {Layout} from './components/Layout';
import {NotFound} from './components/NotFound';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  render(){
    return(
            <BrowserRouter>
              <Layout>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/:map' component={RenderStrategies}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
              </Layout>
            </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
