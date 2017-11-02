import React, { Component } from "react";
import { fire as firebase } from "../../fire";
import "../../react-css/react-css/forum.css";

import axios from "axios";

class ForumsFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      file: "",
      imagePreviewUrl: ""
    };
  }

  submitImageUpload(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  uploadImage(event) {
    event.preventDefault();
    let file = this.state.file;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child("profilePictures/" + file.name)
      .put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot);
      },
      function(error) {},
      function() {
        let downloadURL = [uploadTask.snapshot.downloadURL];
        console.log(downloadURL);
      }
    );
  }

  componentDidMount() {
    return axios.get("/forums").then(response => {
      this.setState({
        posts: response.data
      });
      console.log(this.state);
    });
  }

  render() {
    let forumPost = null;
    if (this.state.posts) {
      let postsArr = this.state.posts;

      forumPost = postsArr.map((e, i) => {
        return (
          <div className="example-post" key={i}>
            <div className="flex-post">
              <h1> {e.title} </h1>
            </div>
            <div>
              <p>
                posted by <b>{e.user}</b>
              </p>
              <p>{e.content}</p>
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
        );
      });
    }

    return (
      <div>
        <div id="forum-splash">
          <h1>GitRektHub</h1>
        </div>
        <div className="center-forum">{forumPost}</div>
      </div>
    );
  }
}

export default ForumsFrame;
