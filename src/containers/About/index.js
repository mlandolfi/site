import React from 'react';
import './styles.css'

import { ArrowDownIcon } from '../../assets/icons';

export default class About extends React.Component {

	render() {
		return (
			<div id="about-root">
				{!this.props.isMobile &&
					<div id="photo-background-container">
						<span id="about-photo-text">
							Mike Landolfi
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
								src={require('../../assets/me.JPG')}
								id="about-me-photo"
								alt="me"
							/>
						</div>
						<div className="about-me-side" >
							<p>
								My name is Mike Landolfi and I'm currently in my third year of studying Computer Science
								at Rensselaer Polytechnic Institute (RPI) in Troy, NY. Although I have only been at RPI
								for three years, I am a standing Senior and will be graduating in May of 2020.
							</p>
							<p>
								I'm most intrigued by front end development and constructing simple but powerful websites.
								I have the most experience writing in React but also have a deep understanding of plain HTML and CSS.
								In addition, I am very familiar with Redux as well as making requests to RESTful and GraphQL APIs.
								Although I enjoy working on the front end, I am always excited to learn new skills and expand into
								different areas of computer science.
							</p>
							<p>
								When I'm not occupied with coursework or exploring my side projects you'll probably find me
								enjoying the outdoors. I love being active and hiking or running, but am also content spending
								an entire day at the beach enjoying the sun and surf.
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