import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom"

import GamingNews from './GamingNews/GamingNews'
import EsportEvents from './EsportEvents/EsportEvents'
import TestComponent from './TestComponent'
import LolEvents from './EsportEvents/LolEvents'
import OwEvents from './EsportEvents/OwEvents'

import '../../styles/Home/HomeFrame.css'





class HomeFrame extends Component{

	render(){



		const tabs = [
		{
		  name: 'PUBGs',
		  content: <LolEvents />
		},
		{
			name: 'League of Legends',
		  content: <LolEvents />
		},
		{
			name: 'OW',
		  content: <OwEvents />
		}];
		const TabApp = (props) => {
		  return (
		    <Tabs selected={props.firstSelect || 0}>

		    {props.tabs.map(tab =>
		      <Pane label={tab.name}>{tab.content}</Pane>)
		    }
		    </Tabs>
		  );
		}
		const Pane = (props) => {
		  return <div>{props.children}</div>;
		}
		class Tabs extends React.Component {
		  constructor(props) {
		    super(props);
		    this.state = { selected: this.props.selected };
		  }
		  _renderTitles() {
		    function labels(child, idx) {
		      let activeClass = (this.state.selected === idx ? 'is-active' : '');
		      return (
		        <li role="tab" key={idx} aria-controls={`panel${idx}`}>
		          <a className={activeClass}
		          onClick={this.onClick.bind(this, idx)}
		          href="#">
		            {child.props.label}
		          </a>
		        </li>
		      );
		    }
		    return (
		      <ul className="tabs__labels" role="tablist">
		        {this.props.children.map(labels.bind(this))}
		      </ul>
		    );
		  }
		  onClick(index, event) {
		    event.preventDefault();
		    this.setState({
		      selected: index
		    });
		  }
		  render() {
		    return (
		      <div className="tabs">
		        {this._renderTitles()}

		        <div className="tabs__content">
		          {this.props.children[this.state.selected]}
		        </div>
		      </div>);
		  }
		}




		return(
			<div id="HomeFrame">

				<TabApp tabs={tabs} firstSelect={1} />

				<TestComponent />

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