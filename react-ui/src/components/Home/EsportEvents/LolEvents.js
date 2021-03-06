import React, { Component } from 'react'

const lolWorldsUrl = 'https://api.pandascore.co/tournaments/569?token=uUZY3m0LxYAOan30JqJ-hA-SmWJEiC7JUmNPQcbOu4IZkq9fLsk'

class LolEvents extends Component{

	constructor(props){
		super(props)
		this.state = {
			lolTeams: [],
			lolMatches: []
		}
	}

	componentDidMount(){
		return fetch(lolWorldsUrl)
		.then( resp => resp.json() )
		.then( res => {
			console.log(res)
			this.setState({
				lolTeams: res.teams,
				lolMatches: res.matches
			})
		})
	}



	render(){
		return(
			<div id="LolEvents">				
				{
					this.state.lolTeams.map( (t, ti) => {
						return <div className="teamDiv" key={ti}>
							<img src={t.image_url} alt="{'team logo'}" className="teamImage" />
							<p>{t.name}</p>
						</div>
					})
				}

				

			</div>
		)
	}
}

export default LolEvents