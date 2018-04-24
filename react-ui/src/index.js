import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';
import { Home }                 from './Home.js';
import './styles/index.css';
import { RenderMap }            from './components/RenderMap';
import { RenderStrategies }     from './components/RenderStrategies';
import { RenderSetups }         from './components/RenderSetups';
import { BrowserRouter, Route, HashRouter, Link, Switch } from 'react-router-dom';
import {Header} from './components/Header';
import { Footer } from './components/Footer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render(){
    return(
        // <div className="fullContainer">
          /* <Header /> */
          <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/:map' component={RenderMap}/>
                  <Route exact path='/:map/strategies' component={RenderStrategies}/>
                  <Route exact path='/:map/setups' component={RenderSetups}/>
              </Switch>
          </BrowserRouter>
          /* <Footer /> */
        // </div>
    )
  }
}

// export default App;
ReactDOM.render(<App />, document.getElementById('root'));
