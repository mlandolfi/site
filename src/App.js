import React from 'react';
import './App.css';

import ResumeTab from './containers/Resume';
import AboutTab from './containers/About';
// import Test from './components/Test';
import MineGame from './containers/MineGame';
import SvgBuilder from './containers/SvgBuilder';
import PlaygroundWrapper from './components/PlaygroundWrapper';

import Footer, { FOOTER_HEIGHT } from './components/Footer';

/* Quotes:

- Wisdom begins in Wonder -Socrates

- This is what separates artists from ordinary people: the belief, deep in our hearts,
	that if we build our castles well enough, somehow the ocean won't wash them away -Anne Lamott

- Be curious, not judgmental -Walt Whitman

- Blessed are those who give without remembering and take without forgetting -Elizabeth Bibesco

- There is neither happiness nor misery in the world; there is only the
	comparison of one state with another -Alexandre Dumas

- If you ask me what I came into this life to do, I will tell you: I came to live out loud -Emile Zola

- Whatever you are, be a good one -William Makepeace Thackeray

- If I had asked people what they wanted, they would have said faster horses - Henry Ford
*/

class App extends React.Component {

	constructor(props) {
		super(props);
		this.rootRef = null;
		this.state = {
			tab: 'about',
			wrapClass: 'fade-in',
		}
		this.isMobile = window.innerWidth < 500;
	}

	handleNavClick = (label) => {
		if (this.state.wrapClass === 'fade-out' || this.state.tab === label)	return;
		this.setState({ wrapClass: 'fade-out' });
		setTimeout(() => {
			this.setState({ wrapClass: 'fade-in', tab: label });
			window.scrollTo(0,0);
		}, 400);
	}

	renderTab = () => {
		const { tab } = this.state;
		if (window.location.search === '?mine-game')
			return <MineGame />
		switch(tab) {
			case 'about':
				return <AboutTab isMobile={this.isMobile} />;
			case 'resume':
				return <ResumeTab isMobile={this.isMobile} color={"black"} />;
			case 'playground':
				return <PlaygroundWrapper />
			default:
				return <div />
		}
	}

	render() {
		return (
				<div
					className="app-root"
					ref={(node) => {this.rootRef = node}}
				>
					<div className="header" >
						<div
							className="nav-header"
						>
							<h2
								className="on-text nav-button"
								onClick={() => this.handleNavClick('about')}
								style={this.isMobile ? {} : { marginLeft: 30 }}
							>
								About
							</h2>
							<h2
								className="on-text nav-button"
								onClick={() => this.handleNavClick('resume')}
								style={this.isMobile ? {} : { marginLeft: 30 }}
							>
								Resume
							</h2>
							{!this.isMobile &&
								<h2
									className="on-text nav-button"
									onClick={() => this.handleNavClick('playground')}
									style={this.isMobile ? {} : { marginLeft: 30 }}
								>
									Sandbox
								</h2>
							}
						</div>
					</div>
					<div
						className={this.state.wrapClass}
					>
						{this.renderTab()}
					</div>
					{this.state.tab !== 'playground' &&
						<Footer />
					}
				</div>
			);
	}
}

// function App(props) {
// 	const [tab, setTab] = useState(tabs[parseInt(tabs.length/2)].label);
// 	const [tabColor, setTabColor] = useState(tabs[parseInt(tabs.length/2)].color)
// 	const [wrapClass, setWrapClass] = useState('fade-in')

// 	const handleNavClick = (label, color) => {
// 		setTab(label);
// 		setTabColor(color);
// 		// setWrapClass('fade-out');
// 		// setTimeout(() => setWrapClass('fade-in', 2000))
// 		// setTimeout(() => setTab(label), 2000)
// 	}

// 	const renderTab = () => {
// 		console.log(tab)
// 		switch(tab) {
// 			case 'about':
// 				return <div className={wrapClass} ><div className="blob" style={{ borderColor: 'red' }} /></div>;
// 			case 'resume':
// 				return <div className={wrapClass} ><div className="blob" style={{ borderColor: 'yellow' }} /></div>;
// 			case 'projects':
// 				return <div className={wrapClass} ><div className="blob" style={{ borderColor: 'blue' }} /></div>;
// 		}
// 	}

// 	return (
// 		<div
// 			className="app-root"
// 		>
// 			<div
// 				className="nav-header"
// 			>
// 				{tabs.map((navTab) => (
// 					<Nav
// 						key={`nav-${navTab.label}`}
// 						styleId={navTab.styleId}
// 						label={navTab.label}
// 						color={navTab.color}
// 						onClick={handleNavClick}
// 						selected={tab===navTab.label}
// 					/>
// 					))}
// 			</div>
// 			{renderTab()}
// 		</div>
// 	);
// }

export default App;
