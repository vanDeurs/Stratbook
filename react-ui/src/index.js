import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';
import { Home }                 from './Home.js';
import './styles/index.css';
import { RenderMap }            from './components/RenderMap';
import { RenderStrategies }     from './components/RenderStrategies';
import { RenderSetups }         from './components/RenderSetups';
import { BrowserRouter, Route, HashRouter, Link, Switch } from 'react-router-dom';
import {Layout} from './components/Layout';
import {NotFound} from './components/NotFound';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { DisplayStrategies } from './containers/DisplayStrategies.js';
// import 'bootstrap/dist/css/bootstrap-theme.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
          <Layout>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/:map' component={RenderMap}/>
                    <Route exact path='/:map/strategies' component={RenderStrategies}/>
                    <Route exact path='/:map/setups' component={RenderSetups}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </BrowserRouter>
          </Layout>
    )
  }
}

// I included the BrowserRouter so that I could use NavLinks in the navigationbar. 
// I couldn't find another solution.
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
