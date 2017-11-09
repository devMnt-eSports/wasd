import React, { Component } from "react";
import axios from "axios";

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

    componentDidMount(){
	return axios.get(`/forums/comments/${this.props.post}`).then(results => {
	    this.setState({comments: results.data});
	})
    }
    
  render() {
      return (
	  this.state.comments.reverse().map((e,i) => {
	      return(
		  <div key={i}>
		  <p>{e.post_user}</p>
		  <p>{e.comment_content}</p>
		      </div>
	      )
	  })
      )
  }
}

export default CommentSection;
