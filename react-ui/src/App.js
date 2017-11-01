import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import "./react-css/react-css/main.css";

import HeaderFrame from "./components/Header/HeaderFrame";
import HomeFrame from "./components/Home/HomeFrame";
import ForumsFrame from "./components/Forums/ForumsFrame";
import ProfileFrame from "./components/Profile/ProfileFrame";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderFrame />
        <Router>
          <Switch>
            <Route exact path="/" component={HomeFrame} />
            <Route path="/forums" component={ForumsFrame} />
            <Route path="/profile" component={ProfileFrame} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
