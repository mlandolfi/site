import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav'

const tabs = [
	{ label: 'about', styleId: 'nav-first', color: '#ff652f' },
	{ label: 'resume', styleId: 'nav-second', color: '#ffe400' },
	{ label: 'projects', styleId: 'nav-third', color: '#14a76c' },
]

function App(props) {
	const [tab, setTab] = useState(tabs[parseInt(tabs.length/2)].label);
	const [tabColor, setTabColor] = useState(tabs[parseInt(tabs.length/2)].color)

	const handleNavClick = (label, color) => {
		setTab(label);
		setTabColor(color);
	}

	return (
		<div
			className="app-root"
		>
			<div
				className="nav-header"
			>
				{tabs.map((navTab) => (
					<Nav
						key={`nav-${navTab.label}`}
						styleId={navTab.styleId}
						label={navTab.label}
						color={navTab.color}
						onClick={handleNavClick}
						selected={tab===navTab.label}
					/>
					))}
			</div>
			<div className="blob" />
		</div>
	);
}

export default App;
