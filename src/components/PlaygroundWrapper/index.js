import React, { useState } from 'react';

import Particles from '../../containers/Particles';
import StyleBank from '../../containers/StyleBank';
import LandosComponents from '../../containers/LandosComponents'; 

import './styles.css';

export default function PlaygroundWrapper(props) {
	const [tab, setTab] = useState('Components');

	const TABS = ['Particles', 'StyleBank', 'Components'];

	const changeTab = (tab) => (event) => {setTab(tab)};

	const renderTab = () => {
		switch (tab) {
			case 'Particles':
				return <Particles />;
			case 'StyleBank':
				return <StyleBank />;
			case 'Components':
				return <LandosComponents />;
			default:
				return <Particles />;
		}
	}

	return (
		<div className="pw-root">
			<div className="pw-menu" >
				<div className="pw-menu-divider" />
				{TABS.map((tab) => (
					<p
						className='pw-tab'
						key={`pw-tab-${tab}`}
						onClick={changeTab(tab)}
					>
						{tab}
					</p>))}
			</div>
			{renderTab()}
		</div>);
}