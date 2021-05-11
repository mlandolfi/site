import React from 'react';
import './styles.css'

import { ArrowDownIcon } from '../../assets/icons';

const photo = require('../../assets/me.JPG');
console.log(photo)

export default class About extends React.Component {

	render() {
		return (
			<div id="about-root">
				{!this.props.isMobile &&
					<div id="photo-background-container">
						<span id="about-photo-text">
							Michael Landolfi
							{/*<div style={{ height: 30 }} />
							<p className="on-text" id="about-photo-quote">
															Web Developer
														</p>*/}
						</span>
						<a href="#about-info-container">
							<div id="about-arrow-down" className="flex-center">
								<ArrowDownIcon color="#000" size="50" />
							</div>
						</a>
					</div>
				}
				<div id="about-info-container">
					<h1 className="on-text" id="about-title">
						About
					</h1>
					<div id="about-me-container">
						<div className="about-me-side" >
							<img
								src={photo.default}
								id="about-me-photo"
								alt="me"
							/>
						</div>
						<div className="about-me-side" >
							<p>
								Hello, I'm Michael Landolfi and I'm currently a Software Engineer II at Quicken.
								I work on Simplifi, which is a personal finance management tool. My responsibilites range
								from building custom and reusable components to writing and testing complex logic to perform
								calculations on thousands of financial transactions.
							</p>
							<p>
								I'm most intrigued by front end development and constructing simple but powerful websites.
								I have the most experience writing in React but also have a deep understanding of HTML and CSS.
								In addition, I am very familiar with Redux as well as making requests to RESTful and GraphQL APIs.
								Although I enjoy working on the front end, I am always excited to learn new skills and expand into
								different areas of computer science.
							</p>
							<p>
								When I'm not occupied with my job or working on side projects you'll probably find me outdoors.
								I love going hiking or running, but can also spend the entire day at the beach laying in the sun.
							</p>
							<i style={{ textAlign: 'center', fontSize: 18 }}>
								Wisdom begins in Wonder - Socrates
							</i>
						</div>
					</div>
				</div>
			</div>
			);
	}

}