import React, { Component } from 'react'

import EventsView from './EventsView'


class EsportEvents extends Component{
	render(){
		return(
			<div id="EsportEvents">

				<h2>Esport Events</h2>

				<EventsView />

			</div>
		)
	}
}

export default EsportEvents