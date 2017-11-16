import React, { Component } from 'react'

import nia from '../../../assets/nia.png'
import owl from '../../../assets/owl.jpg'

const owEventUrl = 'https://api.pandascore.co/leagues/2042/tournaments?token=uUZY3m0LxYAOan30JqJ-hA-SmWJEiC7JUmNPQcbOu4IZkq9fLsk'


class OwEvents extends Component{

	// constructor(props){
	// 	super(props)
	// 	this.state = {
	// 		owTeams: [],
	// 		owMatches: []
	// 	}

	// }

	// componentDidMount(){
	// 	return fetch(owEventUrl)
	// 	.then( resp => resp.json() )
	// 	.then( res => {
	// 		this.setState({
	// 			owTeams: res[0].teams,
	// 			owMatches: res[0].matches
	// 		})

	// 		console.log(this.state.owTeams)
	// 	})
	// }

	render(){
		return(
			<div id="OwEvents">
				{/*
				{
					this.state.owTeams.map( (ot, oti) => {
						return <div className="teamDiv" key={oti}>
						
							<img src={ot.image_url} alt={nia} className="teamImage" />
							<p>{ot.name}</p>
						</div>
					})
				}

				{
					this.state.owMatches.map( (om, omi) => {
						return <div key={omi}>
							{om.name}
						</div>
					})
				}
				*/}
				<img src={owl} />
			</div>
		)
	}
}
export default OwEvents