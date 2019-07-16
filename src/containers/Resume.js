import React from 'react';
import './Resume.css';

import MapLocation from '../components/MapLocation';

const sections = [
	{ label: 'experience', ref: React.createRef() },
	{ label: 'education', ref: React.createRef() },
	{ label: 'skills', ref: React.createRef() },
	{ label: 'awards', ref: React.createRef() },
	{ label: 'leadership', ref: React.createRef() },
]

const Dash = (props) => (<div className="baby-dash" />)

export default class Resume extends React.Component {

	constructor(props) {
		super(props);
		this.state = { mapOn: sections[0].label, mapOnIndex: 0 };
		this.scrollMargin = 0;
	}

	componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
  	if (this.state.mapOnIndex === 0) {
  		if (window.scrollY > sections[1].ref.current.offsetTop)
  			this.setState({ mapOn: sections[1].label, mapOnIndex: 1 });
  	} else if (this.state.mapOnIndex === sections.length-1) {

  	}	else {
  		// if (window.scrollY < sections[this.state.mapOnIndex].ref.current.offsetTop-this.scrollMargin)
  		// 	this.setState({ mapOn: sections[this.state.mapOnIndex-1].label, mapOnIndex: this.state.mapOnIndex-1 });
  	}
  }

	handleMapClick = (section, index) => (event) => {
		this.setState({
			mapOn: section.label,
			mapOnIndex: index,
		});
		if (section.ref.current) {
			window.scroll({
				top: section.ref.current.offsetTop - section.ref.current.clientHeight-20,
				left: 0,
				behavior: 'smooth'
			});
		}
	}

	render() {
		return (
			<div className="resume-root" >
				<div className="resume-map-container" >
					<div
						className="resume-map"
					>
						<div
							id="resume-map-blob"
							style={{ top: 9+this.state.mapOnIndex*30 }}
						/>
						{sections.map((section, index) => (
							<MapLocation
								key={section.label}
								label={section.label}
								color={this.props.color}
								selected={this.state.mapOn === section.label}
								onClick={this.handleMapClick(section, index)}
							/>
							))}
					</div>
				</div>
				<div className="resume-content" >
					<h1 className="resume-section-title" ref={sections[0].ref} >experience</h1>
					<div className="experience-timeline" >
						<div id="timeline-line" />
						<div className="timeline-section">
							<div className="timeline-ball">
								summer 2018
							</div>
							<div className="on-text" >
								<h2 className="on-text" >
									Quicken - Software Engineer Intern, Menlo Park, CA
								</h2>
								<h5 className="on-text" >
									may 2019 ~ august 2019
								</h5>
								<h5 className="on-text" >
									<div style={{margin: 8}}/>
									<b>constructed</b> pages enabling users to track their savings over time,
									categorize and tag transactions more easily, and forecast their finances,
									into the future based on several variables. Also improved and maintained
									other features across the application.
									<div style={{margin: 8}}/>
									<b>worked</b> on a team using the scrum methodology with 2 week long sprints
									organized and tracked on jira
									<div style={{margin: 8}}/>
									<b>skills:</b> reactjs, react-redux, redux, axios, react router, immutable.js
									axios, moment, material ui, amcharts,
								</h5>
							</div>
						</div>
						<div style={{ height: 70 }} />
						<div className="timeline-section" >
							<div className="timeline-ball" style={{ top: 200 }} >
								summer 2017
							</div>
							<div className="on-text">
								<h2 className="on-text" >
									Quicken - Software Engineer Intern, Menlo Park, CA
								</h2>
								<h5 className="on-text" >
									june 2018 ~ august 2018
								</h5>
								<h5 className="on-text" >
									<div style={{margin: 8}}/>
									<b>constructed</b> pages enabling users to track their net income and
									to initiate and track automated savings over time, and simultaneously
									improved and maintained other features across the application
									<div style={{margin: 8}}/>
									<b>worked</b> on a team using the scrum methodology with 2 week long sprints
									organized and tracked on jira
									<div style={{margin: 8}}/>
									<b>skills:</b> reactjs, react-redux, redux, axios, react router,
									redux sagas, axios, material ui, victory
								</h5>
							</div>
						</div>
						<div style={{ height: 50 }} />
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={sections[1].ref} >{sections[1].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }} >
						<div>
							<h2 className="on-text">
								b.s. in computer science, expected may 2020
							</h2>
							<h4 className="on-text">
								rensselaer polytechnic institute, troy, ny
							</h4>
							<h4 className="on-text">
								gpa: 3.84
							</h4>
							<div style={{ height: 10 }} />
							<div id="coursework-container">
								<h3
									className="on-text"
									id="coursework-header"
								>
									relevant coursework
								</h3>
								<div>
									<div className="coursework-row">
										<h5 className="coursework-text-left on-text"><Dash />data structures</h5>
										<h5 className="coursework-text-right on-text"><Dash />principles of software</h5>
									</div>
									<div className="coursework-row">
										<h5 className="coursework-text-left on-text"><Dash />discrete mathematics</h5>
										<h5 className="coursework-text-right on-text"><Dash />computer organization</h5>
									</div>
									<div className="coursework-row">
										<h5 className="coursework-text-left on-text"><Dash />operating systems</h5>
										<h5 className="coursework-text-right on-text"><Dash />database systems (fall 2019)</h5>
									</div>
									<div className="coursework-row">
										<h5 className="coursework-text-left on-text"><Dash />intro to ai</h5>
										<h5 className="coursework-text-right on-text"><Dash />programming languages (fall 2019)</h5>
									</div>
									<div className="coursework-row">
										<h5 className="coursework-text-left on-text"><Dash />intro to algorithms</h5>
										<h5 className="coursework-text-right on-text"><Dash />large scale programming & testing (fall 2019)</h5>
									</div>
								</div>
							</div>
						</div>
						<div>
							<h2 className="on-text">
								menlo atherton high school, atherton, ca
							</h2>
							<h4 className="on-text">
								graduated in 2017
							</h4>
						</div>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={sections[2].ref} >{sections[2].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h3 className="on-text skills-text">
							<b>proficient in</b>: javascript - python - html - css - c - c++ - java
						</h3>
						<h3 className="on-text skills-text">
							<b>experience with</b>: git version control - http request methods - scrum methodologies - agile development
						</h3>
						<h3 className="on-text skills-text">
							<b>excellent</b>: oral and written communication skills
						</h3>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={sections[3].ref} >{sections[3].label}</h1>
					<h3 className="on-text skills-text">
						<b>eagle scout</b>, december 2016
					</h3>
					<h3 className="on-text skills-text">
						<b>member of the order of the arrow</b>, boy scout honor society, 2013
					</h3>
					<h3 className="on-text skills-text">
						<b>dean's honor list</b>, fall 2017 - spring 2019
					</h3>
					<h3 className="on-text skills-text">
						<b>rensselaer leadership award scholarship</b>
					</h3>
					<h3 className="on-text skills-text">
						<b>ap scholar with distinction</b>, 2016 & 2017
					</h3>
				</div>
			</div>
			);
	}

}