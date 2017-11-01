import React, { Component } from "react";

class LeftNav extends Component {
  render() {
    return (
      <div className="wrapper">
        <input type="checkbox" id="testToggler" className="input-toggler" />
        <label for="testToggler" className="test-toggler">
          <span className="menu-toggler__line" />
          <span className="menu-toggler__line" />
          <span className="menu-toggler__line" />
        </label>
      </div>
      <div className="left-tabs">
        <div>
          <h3>PlayerUnknown{`'`}s Battlegrounds</h3>
        </div>
        <div>
          <h3>Team Fortress 2</h3>
        </div>
        <div>
          <h3>League of Legends</h3>
        </div>
      </div>
    );
  }
}

export default LeftNav;
