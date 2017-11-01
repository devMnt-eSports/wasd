import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'

// import NavBarFrame from '../../components/Header/NavBar/NavBarFrame';

import '../../styles/Header/HeaderFrame.css';


import wasdlogo from '../../assets/wasd.png'

class HeaderFrame extends Component{
	render(){
		return(
			<div id="HeaderFrame">
				<div className="wasd_div">
					<Router><Link to={'/'}><img src={wasdlogo} alt={'wasd logo'} /></Link></Router>
				</div>

				<div className="navGamesDiv">
					<div className="navGame">
						<h3>PLAYERUNKNOWN'S BATTLEGROUNDS</h3>
					</div>
					<div className="navGame">
						<h3>LEAGUE OF LEGENDS</h3>
					</div>
					<div className="navGame">
						<h3>OVERWATCH</h3>
					</div>
				</div>

				{/*
				<NavBarFrame />
			*/}

				<ul>
					<li><Router><Link to={'/profile'}>My Profile</Link></Router></li>
					<li><Router><Link to={'/forums'}>Forums</Link></Router></li>
				</ul>

			</div>
		)
	}
}

export default HeaderFrame