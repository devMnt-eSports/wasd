import React, { Component } from "react";
import { fire as firebase } from "../../fire";
import CommentSection from "../Forums/ForumsComments.js";

import axios from "axios";

import "../../react-css/react-css/profile.css";

class ProfileFrame extends Component {
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
      comment: {
        content: "",
        title: ""
      }
    };

    this.uploadImage = this.uploadImage.bind(this);
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
    let that = this;
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
        let downloadURL = uploadTask.snapshot.downloadURL;
        let userId = that.state.user.id;
        console.log(that.state);
        return axios.post(`/profile/picture`, { url: downloadURL, id: userId });
      }
    );
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
        axios.get("/profile/personal-posts").then(res => {
          this.setState({
            posts: res.data.reverse()
          });
          console.log(this);
          this.forceUpdate();
        });
      });
  }

  deletePost(id, username) {
    return axios
      .delete(`/profile/delete/${username}/${id}`, {})
      .then(response => {
        this.setState({
          posts: response.data.reverse()
        });
      });
  }

  handleCommentChange(event) {
    this.setState({ comment: { content: event.target.value } });
  }

  straightFire(clickedId) {
    console.log(`This post is stright FIRE`);
    const currentState = this.state.fire;
    this.setState({ fire: !currentState, clickedTitle: clickedId });
  }

  async componentDidMount() {
    const profileRequest = await axios.get(`/profile`);
    const postsRequest = await axios.get(`/profile/personal-posts`);

    this.setState({
      user: profileRequest.data,
      posts: postsRequest.data
    });
  }

  render() {
    let myPosts = null;
    if (this.state.posts) {
      let postsArr = this.state.posts;

      myPosts = postsArr
        .sort((a, b) => {
          return b.id - a.id;
        })
        .map((e, i) => {
          return (
            <div className="flex-personal" key={i}>
              <div className="center-personal">
                <div className="flex-my-posts">
                  {this.state.fire && this.state.clickedTitle == e.id ? (
                    <h1 className="font-effect-fire-animation">{e.title}</h1>
                  ) : (
                    <h1>{e.title}</h1>
                  )}
                  <div id="personal-resizer">
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
                    This Post Is FIRE
                  </button>
                  <button onClick={() => this.deletePost(e.id, e.user_name)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        });
    }
    return (
      <div>
        <div className="profile-head">
          <div id="profile-back">
            <h1>My Profile</h1>
            <h3>
              Welcome, <br /> <b>{this.state.user.name || "current user"}</b>!
            </h3>
            <div id="personal-profile">
              <img
                src={
                  this.state.imagePreviewUrl ||
                  this.state.user.user_profile_pic ||
                  "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                }
                alt={this.state.user.name}
              />
            </div>
            <form onSubmit={event => this.uploadImage(event)}>
              <input
                type="file"
                className="custom-file-input"
                onChange={event => this.submitImageUpload(event)}
              />
              <button type="submit" onClick={event => this.uploadImage(event)}>
                Upload Image
              </button>
            </form>
          </div>
        </div>
        <div className="profile-bg">{myPosts}</div>
      </div>
    );
  }
}

export default ProfileFrame;
