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
			<div>
				<h1>Home Frame</h1>
				<h2>Today In Gaming:</h2>
				
				{
					this.state.news.articles.map( (x)=>{
						return <div>
							<h3>{x.title} - {x.author}</h3>
							<img src={x.urlToImage} alt={'img'}/>
						</div>
					})
				}				

			</div>
		)
	}
}

export default HomeFrame