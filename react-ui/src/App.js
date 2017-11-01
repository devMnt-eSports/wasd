import React, { Component } from "react";
import "./react-css/react-css/main.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Navbar will be on every page, so it stays in the main App.js, no need
        to make a separate component */}
        <nav>
          <ul id="nav-bar">
            <li>Home</li>
            <li>Forum</li>
            <li>My Profile</li>
            <li>Login</li>
          </ul>
        </nav>
        {/* Below copied to file components/home/leftnav */}
        <div className="content-distribution">
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
          <div className="middle-feed">
            {/* Below copied to components/home/homesplash */}
            <div>
              <h1 id="main-feed-head">Hottest News!</h1>
            </div>
            {/* Below copied to components/home/homefeed */}
            <div className="example-article">
              <div id="article-head">
                <h1>Behold the Splash Article!</h1>
                <img
                  id="img-resizer"
                  src="https://m.popkey.co/66a437/d9W06_s-200x150.gif"
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                auctor euismod mauris, vitae pulvinar nulla volutpat mollis.
                Maecenas in felis eros. Quisque viverra, nisi sit amet feugiat
                facilisis, tortor dui porta ex, a porttitor sapien arcu sit amet
                sapien. Duis maximus luctus felis, at placerat erat sollicitudin
                eu. Cras lacinia a massa ac tincidunt. Integer at semper purus.
                Sed elit sapien, pellentesque sed pulvinar posuere, ultrices et
                nulla. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Quisque ullamcorper nisl ipsum, ac sollicitudin erat
                cursus vel. Duis venenatis lacinia odio.
              </p>
            </div>
          </div>
          <div className="social-media">
            {/* Below copied to components/home/twittefeed */}
            <div>
              <h3>Twitter Feed:</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                auctor euismod mauris, vitae pulvinar nulla volutpat mollis.
                Maecenas in felis eros.
              </p>
            </div>
            <div>
              <p>
                Quisque viverra, nisi sit amet feugiat facilisis, tortor dui
                porta ex, a porttitor sapien arcu sit amet sapien. Duis maximus
                luctus felis, at placerat erat sollicitudin eu. Cras lacinia a
                massa ac tincidunt. Integer at semper purus. Sed elit sapien,
                pellentesque sed pulvinar posuere, ultrices et nulla. Interdum
                et malesuada fames ac ante ipsum primis in faucibus. Quisque
                ullamcorper nisl ipsum, ac sollicitudin erat cursus vel. Duis
                venenatis lacinia odio.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
