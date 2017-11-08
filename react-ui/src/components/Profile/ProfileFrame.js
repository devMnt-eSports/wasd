import React, { Component } from "react";
import { fire as firebase } from "../../fire";
import FilterOptions from "./ProfileFilterOptions/ProfileFilterOptions.js";

import axios from "axios";

import "../../react-css/react-css/profile.css";

class ProfileFrame extends Component {
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
      }
    };
    this.uploadImage = this.uploadImage.bind(this);
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

      myPosts = postsArr.reverse().map((e, i) => {
        return (
          <div className="example-post" key={i}>
            <div className="flex-post">
              <h1> {e.title} </h1>
              <img
                id="profile-resizer"
                src={
                  e.user_profile_pic ||
                  "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
                }
              />
            </div>
            <div>
              <p>
                posted by <b>{e.user_name}</b>
              </p>
              <p>{e.content}</p>
              {/* <div>{commentSection}</div> */}
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
        );
      });
    }
    return (
      <div>
        <div className="profile-head">
          <div id="profile-back">
            <h1>My Profile</h1>
            <h3>
              Welcome, <b>{this.state.user.name || "current user"}</b>!
            </h3>
            <img
              id="profile-resizer"
              src={
                this.state.user.user_profile_pic ||
                this.state.imagePreviewUrl ||
                "https://vignette.wikia.nocookie.net/jamesbond/images/6/61/Generic_Placeholder_-_Profile.jpg/revision/latest?cb=20121227201208"
              }
              alt={this.state.user.name}
            />
            <form onSubmit={event => this.uploadImage(event)}>
              <input
                type="file"
                onChange={event => this.submitImageUpload(event)}
              />
              <button type="submit" onClick={event => this.uploadImage(event)}>
                Upload Image
              </button>
            </form>
          </div>
        </div>
        <div>
          <p>Filter By:</p>
          <FilterOptions update={this.updateFilter} />
          {myPosts}
        </div>
      </div>
    );
  }
}

export default ProfileFrame;
