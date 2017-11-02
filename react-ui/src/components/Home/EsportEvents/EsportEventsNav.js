import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom"

class EsportEventsNav extends Component{
	render(){
		return(
			<div>
				<Router>
					<h4>
						<span><Link to={'/'}>LOL</Link></span>{` `}
						<span><Link to={'/'}>OW</Link></span>{` `}
						<span><Link to={'/'}>PUBG</Link></span>{` `}

					</h4>
				</Router>
			</div>
		)
	}

}

export default EsportEventsNav
