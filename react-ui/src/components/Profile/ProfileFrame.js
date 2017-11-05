import React, { Component } from "react";
import { fire as firebase } from "../../fire";

import axios from "axios";

import "../../react-css/react-css/profile.css";

class ProfileFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      imagePreviewUrl: "",
      user: {
        name: "",
        id: 0,
        user_profile_pic: ""
      }
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
    return axios.get(`/profile`).then(results => {
      console.log(results.data);
      this.setState({
        user: results.data
      });
    });
  }

  render() {
    return (
      <div className="profile-head">
        <div id="profile-back">
          <h1>My Profile</h1>
          <h3>
            Welcome, <b>{this.state.user.name || "currentUser"}</b>!
          </h3>
          <img
            id="profile-resizer"
            src={this.state.user.user_profile_pic || this.state.imagePreviewUrl}
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
    );
  }
}

export default ProfileFrame;
