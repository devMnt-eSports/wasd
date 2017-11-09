import React, { Component } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import './react-css/react-css/App.css'

import HeaderFrame from "./components/Header/HeaderFrame";
import HomeFrame from "./components/Home/HomeFrame";
import ForumsFrame from "./components/Forums/ForumsFrame";
import ProfileFrame from "./components/Profile/ProfileFrame";

class App extends Component {
  render() {
    return (
      <div className="App">
      <div id="frame">
        <HeaderFrame />
        <Router>
          <Switch>
            <Route exact path="/" render={ () => (
              <HomeFrame>
              </HomeFrame>
            )} />
            <Route path="/forums" component={ForumsFrame} />
            <Route path="/profile" component={ProfileFrame} />
          </Switch>
        </Router>
      </div>
      </div>
    );
  }
}

export default App;
