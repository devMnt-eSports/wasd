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
      fire: false,
      clickedTitle: [],
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
        // console.log(snapshot);
      },
      function(error) {},
      function() {
        let downloadURL = [uploadTask.snapshot.downloadURL];
        // console.log(downloadURL);
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

  postComment(event, n) {
    event.preventDefault();
    return axios
      .post(`/forums/comment`, {
        title: this.state.comment.title,
        content: this.state.comment.content,
        user: this.state.user.name,
        user_profile_pic: this.state.user.user_profile_pic,
        forum_id: n
      })
      .then(response => {
        axios.get("/forums").then(res => {
          this.setState({
            posts: res.data.posts.reverse(),
            user: res.data.user
          });
          this.forceUpdate();
        });
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

  straightFire(clickedId) {
    const currentState = this.state.fire;
    this.setState({ fire: !currentState, clickedTitle: clickedId });
  }

  componentDidMount() {
    return axios.get("/forums").then(response => {
      this.setState({
        posts: response.data.posts.reverse(),
        user: response.data.user
      });
    });
  }

  render() {
    let forumPost = null;
    if (this.state.posts) {
      let postsArr = this.state.posts;

      forumPost = postsArr
        .sort((a, b) => {
          return b.id - a.id;
        })
        .map((e, i) => {
          return (
            <div className="flex-forum" key={i}>
              <div className="center-forum">
                <div className="flex-post">
                  {this.state.fire && this.state.clickedTitle == e.id ? (
                    <h1 className="font-effect-fire-animation">
                      <b>{e.title}</b>
                    </h1>
                  ) : (
                    <h1>
                      <b>{e.title}</b>
                    </h1>
                  )}
                  <div id="profile-resizer">
                    <img
                      src={
                        e.user_profile_pic ||
                        "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                      }
                    />
                  </div>
                </div>
                <div className="p-body">
                  <p id="posted-by">
                    posted by <b>{e.user_name}</b>
                  </p>
                  <p id="forum-paragraph">{e.content}</p>
                  <img src={e.media || null} />
                  <CommentSection post={e.id} />
                  <input
                    id="comment-input"
                    type="text"
                    placeholder="Leave comment..."
                    onChange={e => this.handleCommentChange(e)}
                  />
                  <button onClick={event => this.postComment(event, e.id)}>
                    Comment
                  </button>
                  <button onClick={() => this.straightFire(e.id)}>
                    This Post is FIRE
                  </button>
                </div>
              </div>
            </div>
          );
        });
    }

    return (
      <div className="forum-bg">
        <div id="forum-splash">
          <h1>GitRektHub</h1>
        </div>
        <div className="flex-forum">
          <div className="center-forum">
            <div className="flex-post">
              <h1>
                <b>Write a Post...</b>
              </h1>
              <div id="profile-resizer">
                <img
                  src={
                    this.state.user.user_profile_pic ||
                    "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                  }
                />
              </div>
            </div>
            <div className="post-writer">
              <input
                id="post-writer-title"
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
                  id="custom-file-submit"
                  type="file"
                  onChange={event => this.submitImageUpload(event)}
                />
                <button
                  type="submit"
                  onClick={event => this.uploadImage(event)}
                >
                  Upload Image/Video
                </button>
              </form>
              <input
                id="post-writer-content"
                type="text"
                placeholder="Write your post..."
                onChange={e => this.handleContentChange(e)}
              />
            </div>
            <button
              id="post-writer-submit"
              type="submit"
              placeholder="Submit My Post!"
              onClick={event => this.postToForum(event)}
            >
              <b>Submit My Post!</b>
            </button>
          </div>
        </div>
        <div>{forumPost}</div>
      </div>
    );
  }
}

export default ForumsFrame;
