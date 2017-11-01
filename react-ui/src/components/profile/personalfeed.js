import React, { Component } from "react";

class PersonalFeed extends Component {
  render() {
    return (
      <div className="profile-center-view">
        <h1>Personal Feed</h1>
        <div className="filter-flex">
          <h3>Filter By:</h3>
          <select>
            <option>PlayerUnknown{`'`}s Battlegrounds</option>
            <option>League of Legends</option>
            <option>Team Fortress 2</option>
          </select>
        </div>
        <div className="example-article">
          <h1>Lorem Ipsum Article</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor
            euismod mauris, vitae pulvinar nulla volutpat mollis. Maecenas in
            felis eros. Quisque viverra, nisi sit amet feugiat facilisis, tortor
            dui porta ex, a porttitor sapien arcu sit amet sapien. Duis maximus
            luctus felis, at placerat erat sollicitudin eu. Cras lacinia a massa
            ac tincidunt. Integer at semper purus. Sed elit sapien, pellentesque
            sed pulvinar posuere, ultrices et nulla. Interdum et malesuada fames
            ac ante ipsum primis in faucibus. Quisque ullamcorper nisl ipsum, ac
            sollicitudin erat cursus vel. Duis venenatis lacinia odio.
          </p>
        </div>
      </div>
    );
  }
}

export default PersonalFeed;
