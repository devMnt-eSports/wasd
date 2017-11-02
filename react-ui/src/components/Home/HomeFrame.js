import React, { Component } from 'react'

import '../../styles/Home/HomeFrame.css'

const gamingUrl = 'https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=2107a41c7d9549d497b83f34f6f8aa6b';

class HomeFrame extends Component{

	constructor(props){
		super(props)
		this.state = {
			news: {articles:[]}
		}
	}

	componentDidMount(){
		return fetch(gamingUrl)
		.then( resp => resp.json() )
		.then( re => {
			this.setState({
				news:re
			})
		})	
	}

	render(){
		return(
			<div id="HomeFrame">

				<h1>Home Frame</h1>

				<div id="gamingNews">
					<h2>Today In Gaming:</h2>
					{
						this.state.news.articles.map( (article)=>{
							return <div>
								<h4>{article.title} - {article.author}</h4>
								<img src={article.urlToImage} alt={'img'}/>
							</div>
						})
					}
				</div>

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