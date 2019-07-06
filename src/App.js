import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav'

const tabs = [
	{ label: 'about', styleId: 'nav-first', color: '#ff652f' },
	{ label: 'resume', styleId: 'nav-second', color: '#ffe400' },
	{ label: 'projects', styleId: 'nav-third', color: '#14a76c' },
]

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
		setTimeout(() => this.setState({ wrapClass: 'fade-in', tab: label }), 400)
		this.setState({ navTab: label })
	}

	renderTab = () => {
		const { tab, wrapClass } = this.state;
		switch(tab) {
			case 'about':
				return <div className={wrapClass} ><div className="blob" style={{ borderColor: 'red' }} /></div>;
			case 'resume':
				return <div className={wrapClass} ><div className="blob" style={{ borderColor: 'yellow' }} /></div>;
			case 'projects':
				return <div className={wrapClass} ><div className="blob" style={{ borderColor: 'blue' }} /></div>;
		}
	}

	render() {
		const { navTab, tabColor, wrapClass } = this.state;
		return (
				<div
					className="app-root"
				>
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
					{this.renderTab()}
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
