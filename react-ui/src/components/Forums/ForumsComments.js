import React, { Component } from "react";

class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments
    };
  }

  render() {
    let commentSection = null;
    if (this.state.comments) {
      let commentArr = this.state.comments;

      commentSection = commentArr.reverse().map((e, i) => {
        <div key={i}>
          <p>{e.post_user}</p>
          <p>{e.comment_content}</p>
        </div>;
      });
    }
    return <div>{commentSection}</div>;
  }
}

export default CommentSection;
