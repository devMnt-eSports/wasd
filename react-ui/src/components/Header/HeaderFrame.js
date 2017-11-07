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
					<p>World Action Sports Database</p>
				</div>

				<div className="headerLogin">
					<h4>Login</h4>
					<p>resigter/sign-up</p>
				</div>

				<NavBarFrame />
				
			</div>
		)
	}
}
export default HeaderFrame;