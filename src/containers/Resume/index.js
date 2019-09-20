import React from 'react';
import './styles.css';

import MapLocation from '../../components/MapLocation';
import MobileMenu from '../../components/MobileMenu';
import { DownloadIcon } from '../../assets/icons';

const sections = [
	{ label: 'Experience', ref: null },
	{ label: 'Education', ref: null },
	{ label: 'Skills', ref: null },
	{ label: 'Awards', ref: null },
	{ label: 'Leadership', ref: null },
	{ label: 'Projects', ref: null },
]

const Dash = (props) => (<div className="baby-dash" />)

export default class Resume extends React.Component {

	constructor(props) {
		super(props);
		this.state = { mapOn: sections[0].label, mapOnIndex: 0 };
		this.scrollMargin = 300;
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
			this.setState({ mapOn: sections[currentMapIndex].label, mapOnIndex: currentMapIndex });
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
			setTimeout(() => {this.scrollLock = false}, 800)
		}
	}

	handleMMClick = (section, index) => {
		this.handleMapClick(section, index)();
	}

	render() {
		return (
			<div className="resume-root" >
				{this.props.isMobile &&
					<MobileMenu
						options={sections}
						selected={this.state.mapOn}
						onSelect={this.handleMMClick}
					/>
				}
				{!this.props.isMobile &&
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
				}
				<div className="resume-content" >
					{!this.props.isMobile &&
						<a
							id="resume-download"
							download="Mike_Landolfi_Resume"
							href={require('../../assets/resume.pdf')}
							style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', justifyContent: 'center' }}
						>
							<DownloadIcon color="#22A29F" size="30" />
							<p
								className="tighten-text"
								style={{ marginLeft: 10 }}
							>
								click to download resume as a pdf
							</p>
						</a>
					}
					<h1 className="resume-section-title" ref={(node) => {sections[0].ref = node}} >{sections[0].label}</h1>
					<div className="experience-timeline" >
						{!this.props.isMobile &&
							<div id="timeline-line" />
						}
						<div className="timeline-section">
							{!this.props.isMobile &&
								<div className="timeline-ball">
									Summer 2019
								</div>
							}
							<div className="on-text" >
								<h1 className="on-text" >
									Quicken - Software Engineer Intern, Menlo Park, CA
								</h1>
								<h4 className="on-text" >
									May 2019 ~ August 2019
								</h4>
								<ul className="on-text" >
									<div style={{margin: 8}}/>
									<li>
										Worked with multidisciplinary teams to centralize a theme across the codebase
										for Quicken's web applications, and implemented new infrastructure for creating and
										adding new themes on the app
									</li>
									<div style={{margin: 8}}/>
									<li>
										Rebuilt category and tag selection controls throughout the app to improve
										usability as well as code extensability
									</li>
									<div style={{margin: 8}}/>
									<li>
										Constructed the landing page and beta user registration flow for Quicken's next generation
										web app
									</li>
									<div style={{margin: 8}}/>
									<li>
										Made improvements to the entire react web app ranging from minor bug fixes
										to logical restructuring and performance improvements
									</li>
									<div style={{margin: 8}}/>
								</ul>
							</div>
						</div>
						<div style={{ height: 90 }} />
						<div className="timeline-section" >
							{!this.props.isMobile &&
								<div className="timeline-ball">
									Summer 2018
								</div>
							}
							<div className="on-text">
								<h1 className="on-text" >
									Quicken - Software Engineer Intern, Menlo Park, CA
								</h1>
								<h4 className="on-text" >
									June 2018 ~ August 2018
								</h4>
								<ul className="on-text" >
									<div style={{margin: 8}}/>
									<li>
										Constructed income tracking feature utilizing several libraries including
										amCharts, Redux, Material-UI, and other existing internal components
									</li>
									<div style={{ margin: 8 }}/>
									<li>
										Led team of interns with diverse experience in creating a new automated 
										savings feature
									</li>
									<div style={{ margin: 8 }}/>
									<li>
										Made improvements to the entire react web app ranging from minor bug fixes
										to logical restructuring and performance improvements
									</li>
								</ul>
							</div>
						</div>
						<div style={{ height: 90 }} />
						<div className="timeline-section" >
							{!this.props.isMobile &&
								<div className="timeline-ball">
									Summer 2017
								</div>
							}
							<div className="on-text">
								<h1 className="on-text" >
									Zeal - Growth Acquisition Intern, San Francisco, CA
								</h1>
								<h4 className="on-text" >
									July 2017 ~ August 2017
								</h4>
								<ul className="on-text" >
									<div style={{margin: 8}}/>
									<li>
										Designed ​ and ran advertisements on Google AdWords and Facebook
										Ads to advertise Zeal’s principle home tutoring product
									</li>
									<div style={{ margin: 8 }}/>
									<li>
										Created ​ and A/B tested differing landing pages to assess elements
										leading to higher throughput by analyzing user traffic data in Excel
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
								B.S. in Computer Science, expected May 2020
							</h1>
							<h3 className="on-text">
								Rensselaer Polytechnic Institute, Troy, NY
							</h3>
							<h3 className="on-text">
								GPA: 3.84
							</h3>
							<div style={{ height: 10 }} />
							<div id="coursework-container">
								<h2
									className="on-text"
									id="coursework-header"
								>
									Relevant Coursework
								</h2>
								<div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />Data Structures</h3>
										<h3 className="coursework-text-right on-text"><Dash />Computer Organization</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />Discrete Mathematics</h3>
										<h3 className="coursework-text-right on-text"><Dash />Software Documentation & Design</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />Operating Systems</h3>
										<h3 className="coursework-text-right on-text"><Dash />Database Systems (Fall 2019)</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />Intro to AI</h3>
										<h3 className="coursework-text-right on-text"><Dash />Programming Languages (Fall 2019)</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />Intro to Algorithms</h3>
										<h3 className="coursework-text-right on-text"><Dash />Large Scale Programming & Testing (Fall 2019)</h3>
									</div>
									<div className="coursework-row">
										<h3 className="coursework-text-left on-text"><Dash />Principles of Software</h3>
									</div>
								</div>
								<div style={{ height: 20 }} />
								<h2
									className="on-text"
									id="coursework-header"
								>
									Undergraduate Mentoring Experince
								</h2>
								<div>
										<h3
											className="coursework-text-left on-text"
											style={this.props.isMobile ? { fontSize: '0.8rem' } : {}}
										>
											<Dash />Intro to Algorithms - Fall 2019
										</h3>
								</div>
							</div>
						</div>
						<div>
							<h1 className="on-text">
								Menlo Atherton High School, Atherton, CA
							</h1>
							<h3 className="on-text">
								Graduated in 2017
							</h3>
						</div>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[2].ref = node}} >{sections[2].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h2 className="on-text skills-text">
							<b>Proficient in</b>: JavaScript - React.JS - Python - HTML - CSS - C - C++ - Java
						</h2>
						<h2 className="on-text skills-text">
							<b>Familiar with</b>: Axios - Redux - npm - Material-UI - React-Bootstrap - Selenium - React Router - amCharts
						</h2>
						<h2 className="on-text skills-text">
							<b>Experience with</b>: Git Version Control - HTTP Requests - RESTful && GraphQL APIs
							- Scrum Methodologies - Agile Development

						</h2>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[3].ref = node}} >{sections[3].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h2 className="on-text skills-text">
							<b>Eagle Scout</b>, December 2016
						</h2>
						<h2 className="on-text skills-text">
							<b>Member of the Order of the Arrow</b>, Boy Scout Honor Society, 2013
						</h2>
						<h2 className="on-text skills-text">
							<b>Dean's Honor List</b>, Fall 2017 - Spring 2019
						</h2>
						<h2 className="on-text skills-text">
							<b>Rensselaer Leadership Award Scholarship</b> Fall 2017 - Fall 2019
						</h2>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[4].ref = node}} >{sections[4].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<h2 className="on-text skills-text">
							<b>Senior Patrol Leader:</b> Primary scout leader elected by the troop to lead all
							meetings, events, and the patrol leaders' council
						</h2>
						<h2 className="on-text skills-text">
							<b>Patrol Leader:</b> Elected leader of a patrol of scouts and is responsible
							for representing and managing the patrol at meetings and events
						</h2>
						<h2 className="on-text skills-text">
							<b>Eagle Scout Project:</b> Directed 15+ people in the construction of an outdoor
							eating area for menlo-atherton high school
						</h2>
						<h2 className="on-text skills-text">
							<b>Sigma Chi Assistant Recruitment Chair:</b> Help plan and put on recruitment
							activities and events
						</h2>
					</div>
					<div style={{ height: 80 }} />
					<h1 className="resume-section-title" ref={(node) => {sections[5].ref = node}} >{sections[5].label}</h1>
					<div style={{ paddingLeft: 20, paddingRight: 20 }}>
						<div className="resume-projects-container">
							<div style={{ position: 'relative' }} >
								<img
									src={require('../../assets/MLR_for_website.png')}
									alt="legacy-recipe-homepage"
									className="resume-projects-image"
								/>
								<div className="resume-projects-image-overlay"></div>
								</div>
							<div style={{ textAlign: 'center', padding: '0px 35px' }}>
								<p className="resume-projects-title">My Legacy Recipe</p>
								<p className="resume-projects-body" >
									Currently building out the front end for a recipe sharing website.
									The site is a React.JS web application that communicates with a GraphQL
									server for authentication and data management.
								</p>
							</div>
						</div>
						<div className="resume-projects-container">
							<div style={{ textAlign: 'center', padding: '0px 35px' }}>
								<p className="resume-projects-title">Personal Website</p>
								<p className="resume-projects-body" >
									Using only ReactJS, HTML, and custom CSS styling,
									constructed a website to present my interactive resume and to use
									as a sandbox for personal projects.
								</p>
							</div>
							<div style={{ position: 'relative' }} >
								<img
									src={require('../../assets/PW_for_website.png')}
									alt="personal-website-homepage"
									className="resume-projects-image"
								/>
								<div className="resume-projects-image-overlay"></div>
								</div>
						</div>
					</div>
					<div style={{ height: 200 }} />
				</div>
			</div>
			);
	}

}