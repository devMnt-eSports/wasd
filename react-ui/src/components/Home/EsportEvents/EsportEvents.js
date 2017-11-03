import React, { Component } from 'react'


import EsportEventsNav from './EsportEventsNav.js'
import EventsView from './EventsView'


class EsportEvents extends Component{
	render(){
		return(
			<div id="EsportEvents">

				<h2>Esport Events</h2>

				<EsportEventsNav />

				<EventsView />

			</div>
		)
	}
}

export default EsportEvents