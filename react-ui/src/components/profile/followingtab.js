import React, { Component } from "react";

class FollowingTab extends Component {
  render() {
    return (
      <div className="left-tab">
        <div>
          <h3>PlayerUnknown{`'`}s Battlegrounds</h3>
          <button>Following</button>
        </div>
        <div>
          <h3>Team Fortress 2</h3>
          <button>Following</button>
        </div>
        <div>
          <h3>League of Legends</h3>
          <button>Following</button>
        </div>
      </div>
    );
  }
}

export default FollowingTab;
