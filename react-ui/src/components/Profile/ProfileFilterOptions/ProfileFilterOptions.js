import React, { Component } from "react";

class FilterOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <select onChange={e => this.props.update(e.target.value)}>
        <option value="pubg">PlayerUnknown{`'`}s Battlegrounds</option>
        <option value="lol">League of Legends</option>
        <option value="overwatch">Overwatch</option>
      </select>
    );
  }
}

export default FilterOptions;
