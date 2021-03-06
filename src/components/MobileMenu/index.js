import React, { useState } from 'react';
import './styles.css';

import { MenuIcon, ArrowDownIcon } from '../../assets/icons';

export default function MobileMenu(props) {

	const [showMenu, setShowMenu] = useState(false);

	const handleSelect = (option, index) => {
		props.onSelect(option, index);
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
					{props.options.map((option, index) => (
						<div
							key={`mm-option-${option.label}`}
							className="mm-option"
							onClick={(e) => handleSelect(option, index)}
							style={props.selected === option.label ? { textDecorationLine: 'underline' } : {}}
						>
							{option.label}
						</div>
						))}
				</div>
				<div
					id="mm-hide-button"
					onClick={(e) => setShowMenu(false)}
				>
					<ArrowDownIcon
						style={{ transform: 'rotate(270deg)' }}
						size="20"
					/>
				</div>
			</div>
			{showMenu &&
				<div
					id="mm-away-modal"
					onClick={(e) => setShowMenu(false)}
				/>
			}
		</div>
		)
}

