import React, { Component } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
class NavBarFrame extends Component{
	render(){
		return(
			<div id="NavBarFrame">
				<Router>
					<ul>
						<li><Link to={'/profile'}><h3>MyProfile</h3></Link></li>
						<li><Link to={'/forums'}><h3>Forums</h3></Link></li>
					</ul>
				</Router>
			</div>
		)
	}
}
export default NavBarFrame