import React from 'react';
import './App.css';

import Nav from './components/Nav'

import ResumeTab from './containers/Resume'

const tabs = [
	{ label: 'about', styleId: 'nav-first', color: '#14a76c' },
	{ label: 'resume', styleId: 'nav-second', color: '#303a75' },
	{ label: 'projects', styleId: 'nav-third', color: '#ffe400' },
]

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
*/

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navTab: tabs[parseInt(tabs.length/2)].label,
			tab: tabs[parseInt(tabs.length/2)].label,
			tabColor: tabs[parseInt(tabs.length/2)].color,
			wrapClass: 'fade-in',
		}
	}

	handleNavClick = (label, color) => {
		if (this.state.wrapClass === 'fade-out')	return;
		this.setState({ wrapClass: 'fade-out' });
		setTimeout(() => this.setState({ wrapClass: 'fade-in', tab: label, tabColor: color }), 400)
		this.setState({ navTab: label })
	}

	renderTab = () => {
		const { tab, wrapClass, tabColor } = this.state;
		switch(tab) {
			case 'about':
				return <div className={wrapClass} ><div className="blob" style={{ borderColor: tabColor }} /></div>;
			case 'resume':
				return <div className={wrapClass} ><ResumeTab color={tabs[1].color} /></div>;
			case 'projects':
				return <div className={wrapClass} ><div className="blob" style={{ borderColor: tabColor }} /></div>;
			default:
				return <div />
		}
	}

	render() {
		const { navTab, tabColor } = this.state;
		return (
				<div
					className="app-root"
				>
				<div style={{ height: '100%' }} >
					<h1
						style={{
							color: tabColor,
						}}
						className="name-header"
					>
						Michael Landolfi
					</h1>
					</div>
					<div className="header" >
						<div
							className="nav-header"
						>
							{tabs.map((tab) => (
								<Nav
									key={`nav-${tab.label}`}
									styleId={tab.styleId}
									label={tab.label}
									color={tab.color}
									onClick={this.handleNavClick}
									selected={navTab===tab.label}
								/>
								))}
						</div>
					</div>
					{this.renderTab()}
					<div style={{ height: 1000 }} />
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
