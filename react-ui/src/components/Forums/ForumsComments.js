import React, { Component } from "react";

import axios from "axios";

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    return axios.get(`/forums/comments/${this.props.post}`).then(results => {
      this.setState({ comments: results.data });
    });
  }

  render() {
    return this.state.comments.map((e, i) => {
      return (
        <div className="comment-box" key={i}>
          <div className="flex-post">
            <p id="posted-by">
              <b>{e.post_user}</b>
            </p>
            <div id="comment-profile">
              <img
                src={
                  e.comment_pic ||
                  "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                }
              />
            </div>
          </div>
          <p id="comment-content">{e.comment_content}</p>
        </div>
      );
    });
  }
}

export default CommentSection;
