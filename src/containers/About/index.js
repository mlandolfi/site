import React from 'react';
import './styles.css'

import { ArrowDownIcon } from '../../assets/icons';

export default class About extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="about-root">
				<img id="about-photo" src={require('../../assets/other.jpg')} alt="beach" />
				<span id="about-photo-text">
					Mike Landolfi
					<div style={{ height: 30 }} />
					<p className="on-text" id="about-photo-quote">
						Wisdom begins in Wonder <br/> -Socrates
					</p>
				</span>
				<a href="#about-info-container">
					<div id="about-arrow-down" className="flex-center">
						<ArrowDownIcon color="#000" size="50" />
					</div>
				</a>
				<div id="about-info-container">
					<h1 className="on-text" id="about-title">
						About
					</h1>
					<div id="about-me-container">
						<div className="about-me-side" >
							<img
								src={require('../../assets/me.JPG')}
								id="about-me-photo"
								alt="me"
							/>
						</div>
						<div className="about-me-side" >
							<p>
								this is my about me
							</p>
						</div>
					</div>
				</div>
			</div>
			);
	}

}