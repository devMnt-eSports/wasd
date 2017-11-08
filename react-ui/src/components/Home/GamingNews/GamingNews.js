import React, { Component } from "react";

import "../../../styles/Home/GamingNews/GamingNews.css";

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

  render() {
    return (
      <div id="gamingNews">
        <h2>Today In Gaming:</h2>
        {this.state.news.articles.map((article, i) => {
          return (
            <div key={i}>
              <h4>
                {article.title} - {article.author}
              </h4>
              <img
                src={article.urlToImage}
                alt={"img"}
                className="gamingNewsImage"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default GamingNews;
