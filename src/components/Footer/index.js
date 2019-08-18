import React from 'react';
import './styles.css';

import { MailIcon } from '../../assets/icons';

export default function MapLocation(props) {
	return (
		<div
			className="footer-root"
			style={{ height: FOOTER_HEIGHT }}
		>
			<a
				href="https://www.linkedin.com/in/michael-landolfi/"
			>
				<img
					src={require('../../assets/lilogo-edited.png')}
					style={{ height: 30 }}
				/>
			</a>
			<div className="footer-vert-divider" />
			<a
				href="mailto:landom2@rpi.edu"
			>
				<MailIcon color="#fff" size={30} />
			</a>
		</div>
		)
}


export const FOOTER_HEIGHT = 75;