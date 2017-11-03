import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom"

import LolEvents from './LolEvents'
import OwEvents from './OwEvents'

class EventsView extends Component{
	render(){
		return(
			<div>
				<Router>
					<Switch>
						<Route exact path="/" component={LolEvents} />
						<Route path="/" component={OwEvents} />
					</Switch>
				</Router>

				{/*
				<LolEvents />
				<OwEvents />
				*/}
			</div>
		)
	}

}

export default EventsView