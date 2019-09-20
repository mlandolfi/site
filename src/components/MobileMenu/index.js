import React, { useState } from 'react';
import './styles.css';

import { MenuIcon, ArrowDownIcon } from '../../assets/icons';

export default function MobileMenu(props) {

	const [showMenu, setShowMenu] = useState(false);

	const handleSelect = (option) => {
		props.onSelect(option);
		setShowMenu(false);
	}

	return (
		<div>
			<button
				id="mm-reveal-button"
				onClick={(e) => setShowMenu(true)}
			>
				<MenuIcon color="#000" size="30" />
			</button>
			<div className={`mm-root ${showMenu ? 'mm-root-show' : ''}`}>
				<div id="mm-options-container">
					{props.options.map((option) => (
						<div
							key={`mm-option-${option}`}
							className="mm-option"
							onClick={(e) => handleSelect(option)}
						>
							{option}
						</div>
						))}
				</div>
				<div
					id="mm-hide-button"
					onClick={(e) => setShowMenu(false)}
				>
					<ArrowDownIcon
						style={{ transform: 'rotate(180deg)' }}
						size="20"
					/>
				</div>
			</div>
		</div>
		)
}

