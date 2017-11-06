import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom"

import GamingNews from './GamingNews/GamingNews'
import EsportEvents from './EsportEvents/EsportEvents'

import '../../styles/Home/HomeFrame.css'





class HomeFrame extends Component{

	render(){

		return(
			<div id="HomeFrame">

				<EsportEvents/>				

				<GamingNews />

				<div id="socialMediaSection">
					<div id="tweets">
						section for tweets
					</div>

					<div id="twitch">
						section for twitch
					</div>
				</div>

			</div>
		)
	}
}

export default HomeFrame