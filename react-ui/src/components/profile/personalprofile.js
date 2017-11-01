import React, { Component } from "react";

class PersonalProfile extends Component {
  render() {
    return (
      <div className="profile-head">
        <div id="profile-back">
          <h1>My Profile</h1>
          <h3>Welcome, TheLegend27!</h3>
          <a href="https://http.cat"><img src="https://m.popkey.co/66a437/d9W06_s-200x150.gif" /></a>
          <p>
            Edit Username | Edit Profile Pic </br> Edit Background
          </p>
        </div>
      </div>
    );
  }
}

export default PersonalProfile;
