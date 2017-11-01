import React, { Component } from "react";
import "../../react-css/react-css/forum.css";

class ForumsFrame extends Component {
  render() {
    return (
      <div>
        <div id="forum-splash">
          <h1>GitRektHub</h1>
        </div>
        <div className="center-forum">
          <div className="example-post">
            <div className="flex-post">
              {/* Forum Post Head */}
              {/* Forum Post UserProfileImage */}
            </div>
            <p>
              posted by <b>{/* UserName */}</b>
            </p>
            {/* Forum Post Content */}
            <input
              id="comment-input"
              type="text"
              placeholder="Leave comment..."
            />
            <button>Comment</button>
            <button>Upvote</button>
            <button>Report</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForumsFrame;
