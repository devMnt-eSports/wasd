import React, { Component } from "react";
import { fire as firebase } from "../../fire";
import "../../react-css/react-css/forum.css";

import CommentSection from "./ForumsComments.js";

import axios from "axios";

class ForumsFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      file: "",
      imagePreviewUrl: "",
      user: {
        name: "",
        id: 0,
        user_profile_pic: ""
      },
      content: "",
      title: "",
      comment: {
        title: "",
        content: ""
      }
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
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
    const uploadTask = storageRef.child("forumFiles/" + file.name).put(file);
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

  postToForum(event) {
    event.preventDefault();
    return axios
      .post(`/forums/post`, {
        user: this.state.user.name,
        content: this.state.content,
        title: this.state.title,
        user_profile_pic: this.state.user.user_profile_pic
      })
      .then(response => {
        this.setState({ posts: response.data.reverse() });
      });
  }

  postComment(event) {
    event.preventDefault();
    return axios
      .post(`/forums/comment`, {
        title: this.state.comment.title,
        content: this.state.comment.content,
        user: this.state.user.name,
        user_profile_pic: this.state.user.user_profile_pic
      })
      .then(response => {
        this.setState({ posts: response.data.reverse() });
      });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ comment: { content: event.target.value } });
  }

  componentDidMount() {
    return axios.get("/forums").then(response => {
      this.setState({
        posts: response.data.posts.reverse(),
        user: response.data.user
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
          <div className="flex-forum" key={i}>
            <div className="center-forum">
              <div className="flex-post">
                <h1> {e.title} </h1>
                <div id="profile-resizer">
                  <img
                    src={
                      e.user_profile_pic ||
                      "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                    }
                  />
                </div>
              </div>
              <div>
                <p>
                  posted by <b>{e.user_name}</b>
                </p>
                <p>{e.content}</p>
                <CommentSection posts={e.comments} />
                <input
                  id="comment-input"
                  type="text"
                  placeholder="Leave comment..."
                  onChange={e => this.handleCommentChange(e)}
                />
                <button onClick={event => this.postComment(event)}>
                  Comment
                </button>
                <button>Upvote</button>
                <button>Report</button>
              </div>
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
        <div className="flex-forum">
          <div className="center-forum">
            <div className="flex-post">
              <h1>Write a Post...</h1>
              <div id="profile-resizer">
                <img
                  src={
                    this.state.user.user_profile_pic ||
                    "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                  }
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Title your post..."
              onChange={e => this.handleTitleChange(e)}
            />
            <img
              id="profile-resizer"
              src={this.state.imagePreviewUrl}
              alt={this.state.name}
            />
            <form onSubmit={event => this.uploadImage(event)}>
              <input
                type="file"
                onChange={event => this.submitImageUpload(event)}
              />
              <button type="submit" onClick={event => this.uploadImage(event)}>
                Upload Image/Video
              </button>
            </form>
            <input
              type="text"
              placeholder="Write your post..."
              onChange={e => this.handleContentChange(e)}
            />
            <button type="submit" onClick={event => this.postToForum(event)}>
              Submit My Post!
            </button>
          </div>
        </div>
        <div>{forumPost}</div>
      </div>
    );
  }
}

export default ForumsFrame;
