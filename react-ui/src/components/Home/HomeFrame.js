import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom"
import axios from "axios";
import "../../react-css/react-css/profile.css";
import "../../react-css/react-css/HomeFrame.css";
import GamingNews from './GamingNews/GamingNews'
import EsportEvents from './EsportEvents/EsportEvents'
class HomeFrame extends Component{
	componentDidMount() {
	  return axios.get(`/`).then(results => {
	    console.log(results.data);
	    this.setState({
	      user: results.data
	    });
	  });
	}
	render(){
		return(
			<div id="HomeFrame">
				<EsportEvents/>
				<GamingNews />
				
			</div>
		)
	}
}
export default HomeFrame