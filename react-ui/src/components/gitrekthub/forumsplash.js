import React, { Component } from "react";

class ForumSplash extends Component {
  render() {
    return (
      <div className="center-forum">
        <div className="example-post">
          <div className="flex-post">
            <h1>Is Gaming Dangerous for Your Soul?</h1>
            <img
              id="post-img-resizer"
              src="https://yt3.ggpht.com/-A5r_mz9oqRU/AAAAAAAAAAI/AAAAAAAAAAA/xskJtxojP4c/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
            />
          </div>
          <p>
            posted by <b>TheLegend27</b>
          </p>
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
          <input style="width:500px" type="text" placeholder="..." />
          <button>Comment</button>
          <button>Upvote</button>
          <button>Report</button>
        </div>
      </div>
    );
  }
}

export default ForumSplash;
