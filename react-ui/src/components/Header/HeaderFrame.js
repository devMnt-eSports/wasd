import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'

import NavBarFrame from '../../components/Header/NavBar/NavBarFrame';

import "../../react-css/react-css/HeaderFrame.css";

import wasdlogo from '../../assets/wasd.png'

class HeaderFrame extends Component{
	render(){
		return(
			<div id="HeaderFrame">
				<div className="wasd_div">
					<Router><Link to={'/'}><img src={wasdlogo} alt={'wasd logo'} /></Link></Router>
					<p>World Action<br />Sports Database</p>
				</div>

				<div className="headerLogin">
					<h4>Sign Up</h4>
					<p>login with <a href="http://wasd.link/auth/twitch"><strong>TWITCH</strong></a> or <a href="http://wasd.link/auth/steam"><strong>STEAM</strong></a></p>
				</div>

				<NavBarFrame />
				
			</div>
		)
	}
}
export default HeaderFrame;