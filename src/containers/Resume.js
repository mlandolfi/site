import React from 'react';
import './Resume.css';

import MapLocation from '../components/MapLocation';

const sections = [
	{ label: 'experience', ref: null },
	{ label: 'education', ref: null },
	{ label: 'skills', ref: null },
	{ label: 'awards', ref: null },
	{ label: 'leadership', ref: null },
]

const Dash = (props) => (<div className="baby-dash" />)

export default class Resume extends React.Component {

	constructor(props) {
		super(props);
		this.state = { mapOn: sections[0].label, mapOnIndex: 0 };
		this.scrollMargin = 200;
		this.scrollLock = false;
	}

	componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
  	if (this.scrollLock) return;
		const currentMapIndex = this.getCurrentMapIndex();
		if (currentMapIndex !== this.state.mapOnIndex) {
			this.setState({ mapOn: sections[currentMapIndex], mapOnIndex: currentMapIndex });
		}
  }

  getCurrentMapIndex = () => {
  	
  	if (sections.some(({ ref }) => ref === null)) {
  		console.log(sections)
  		return 0;
  	}

		if (window.scrollY <= sections[0].ref.offsetTop)
			return 0;
		if (window.scrollY+this.scrollMargin >= sections[sections.length-1].ref.offsetTop)
			return sections.length-1;

  	let currentRef, nextRef = null;
  	for (let i=0; i<sections.length-1; i++) {
  		currentRef = sections[i].ref;
  		nextRef = sections[i+1].ref;
  		if (window.scrollY >= currentRef.offsetTop-this.scrollMargin && window.scrollY < nextRef.offsetTop-this.scrollMargin)
  			return i;
  	}
  	return sections.length-1;
  }

	handleMapClick = (section, index) => (event) => {
		this.scrollLock = true;
		this.setState({
			mapOn: section.label,
			mapOnIndex: index,
		});
		if (section.ref) {
			window.scroll({
				top: section.ref.offsetTop - section.ref.clientHeight-20,
				left: 0,
				behavior: 'smooth'
			});
			setTimeout(() => {this.scrollLock = false}, 500)
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
								selected={this.state.mapOnIndex === index}
								onClick={this.handleMapClick(section, index)}
							/>
							))}
					</div>
				</div>
				<div className="resume-content" >
					<a
						id="resume-download"
						download="Mike_Landolfi_Resume"
						href={require('../assets/resume.pdf')}
					>
						click to download resume as a pdf
					</a>
					<h1 className="resume-section-title" ref={(node) => {sections[0].ref = node}} >experience</h1>
					<div className="experience-timeline" >
						<div id="timeline-line" />
						<div className="timeline-section">
							<div className="timeline-ball">
								summer 2018
							</div>
							<div className="on-text" >
								<h1 className="on-text" >
									Quicken - Software Engineer Intern, Menlo Park, CA
								</h1>
								<h4 className="on-text" >
									may 2019 ~ august 2019
								</h4>
								<ul className="on-text" >
									<div style={{margin: 8}}/>
									<li>
										worked with designers and developers to centralize a theme across the codebase
										for Quicken's web applications, and implemented new infrastructure for creating and
										implementing new themes on the app
									</li>
									<div style={{margin: 8}}/>
									<li>
										rebuilt category and tag selection controls across the app from scratch to improve
										usability as well as code extensability
									</li>
									<div style={{margin: 8}}/>
									<li>
										constructed the landing page and beta registration flow for Quicken's new web app
									</li>
									<div style={{margin: 8}}/>
									<li>
										made improvements to the entire react web app ranging from minor bug fixes
										to logical restructuring and performance improvements
									</li>
									<div style={{margin: 8}}/>
								</ul>
							</div>
						</div>
						<div style={{ height: 70 }} />
						<div className="timeline-section" >
							<div className="timeline-ball" style={{ top: 200 }} >
								summer 2017
							</div>
							<div className="on-text">
								<h1 className="on-text" >
									Quicken - Software Engineer Intern, Menlo Park, CA
								</h1>
								<h4 className="on-text" >
									june 2018 ~ august 2018
								</h4>
								<ul className="on-text" >
									<div style={{margin: 8}}/>
									<li>
										constructed income tracking feature utilizing several libraries including
										amcharts, redux, material-ui, and other existing internal tools
									</li>
									<div style={{ margin: 8 }}/>
									<li>
										led team of interns with diverse experience in creating a new automated 
										savings feature
									</li>
									<div style={{ margin: 8 }}/>
									<li>
										made improvements to the entire react web app ranging from minor bug fixes
										to logical restructuring and performance improvements
									</li>
								</ul>
							</div>
						</div>
						<div style={{ height: 50 }} />
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[1].ref = node}} >{sections[1].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }} >
						<div>
							<h1 className="on-text">
								b.s. in computer science, expected may 2020
							</h1>
							<h3 className="on-text">
								rensselaer polytechnic institute, troy, ny
							</h3>
							<h3 className="on-text">
								gpa: 3.84
							</h3>
							<div style={{ height: 10 }} />
							<div id="coursework-container">
								<h2
									className="on-text"
									id="coursework-header"
								>
									relevant coursework
								</h2>
								<div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />data structures</h3>
										<h3 className="coursework-text-right on-text"><Dash />principles of software</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />discrete mathematics</h3>
										<h3 className="coursework-text-right on-text"><Dash />computer organization</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />operating systems</h3>
										<h3 className="coursework-text-right on-text"><Dash />database systems (fall 2019)</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />intro to ai</h3>
										<h3 className="coursework-text-right on-text"><Dash />programming languages (fall 2019)</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />intro to algorithms</h3>
										<h3 className="coursework-text-right on-text"><Dash />large scale programming & testing (fall 2019)</h3>
									</div>
								</div>
							</div>
						</div>
						<div>
							<h1 className="on-text">
								menlo atherton high school, atherton, ca
							</h1>
							<h3 className="on-text">
								graduated in 2017
							</h3>
						</div>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[2].ref = node}} >{sections[2].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h2 className="on-text skills-text">
							<b>proficient in</b>: javascript - reactjs - python - html - css - c - c++ - java
						</h2>
						<h2 className="on-text skills-text">
							<b>Familiar with</b>: axios - redux - npm - material-ui - react-bootstrap - selenium - react router
						</h2>
						<h2 className="on-text skills-text">
							<b>experience with</b>: git version control - http request methods - scrum methodologies - agile development
						</h2>
						<h2 className="on-text skills-text">
							<b>excellent</b>: oral and written communication skills
						</h2>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[3].ref = node}} >{sections[3].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h2 className="on-text skills-text">
							<b>eagle scout</b>, december 2016
						</h2>
						<h2 className="on-text skills-text">
							<b>member of the order of the arrow</b>, boy scout honor society, 2013
						</h2>
						<h2 className="on-text skills-text">
							<b>dean's honor list</b>, fall 2017 - spring 2019
						</h2>
						<h2 className="on-text skills-text">
							<b>rensselaer leadership award scholarship</b>
						</h2>
						<h2 className="on-text skills-text">
							<b>ap scholar with distinction</b>, 2016 & 2017
						</h2>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[4].ref = node}} >{sections[4].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h2 className="on-text skills-text">
							<b>Senior Patrol Leader:</b> primary scout leader elected by the troop to lead all
							meetings, events, and the patrol leaders' council
						</h2>
						<h2 className="on-text skills-text">
							<b>Patrol Leader:</b> elected leader of a patrol of scouts that is responsible
							for representing and managing the patrol at meetings and events
						</h2>
						<h2 className="on-text skills-text">
							<b>eagle scout project:</b> directed 15+ people in the construction of an outdoor
							eating area for menlo-atherton high school
						</h2>
						<h2 className="on-text skills-text">
							<b>sigma chi (ΣΧ) Assistant recruitment chair:</b> help plan and put on recruitment
							activities and events
						</h2>
					</div>
					<div style={{ height: 450 }} />
				</div>
			</div>
			);
	}

}