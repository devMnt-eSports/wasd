import React, { Component } from "react";

class HomeFeed extends Component {
  render() {
    return (
      <div className="example-article">
        <div id="article-head">
          <h1>Behold the Splash Article!</h1>
          <img
            id="img-resizer"
            src="https://m.popkey.co/66a437/d9W06_s-200x150.gif"
          />
        </div>
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
    );
  }
}

export default HomeFeed;
