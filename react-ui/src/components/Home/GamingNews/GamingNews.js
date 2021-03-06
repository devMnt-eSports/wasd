import React, { Component } from "react";

import "../../../styles/Home/GamingNews/GamingNews.css";
import '../../../react-css/react-css/GamingNews.css'

const gamingUrl =
  "https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=2107a41c7d9549d497b83f34f6f8aa6b";

class GamingNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: { articles: [] }
    };
  }

  componentDidMount() {
    return fetch(gamingUrl)
      .then(resp => resp.json())
      .then(re => {
        this.setState({
          news: re
        });
      });
  }
  
	render(){
		return(
			<div id="gamingNews">
				<h2>Today In Gaming:</h2>
				<div className="gamingArticle">
				{
					this.state.news.articles.map( (article, i)=>{
						return <div className="article" key={i}>
							<h4><a href={article.url} target="_blank">{article.title}</a> <span className="headerLine">|</span> <small>{article.author}</small></h4>
							<p><small>{article.publishedAt}</small></p>
							<img src={article.urlToImage} alt={'img'} className="gamingNewsImage" />
						</div>
					})
				}
				</div>
			</div>
		)
	}
}

export default GamingNews;
