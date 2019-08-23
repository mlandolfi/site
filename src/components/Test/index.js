import React, { useState } from 'react';
import './styles.css';

export default function Test(props) {

	const [hover, setHover] = useState(false);

	const toggleHover = (boi) => (e) => setHover(boi);

	return (
		<div className="test-root">
			<div
				className="test-full-block"
				style={{ fontSize: 34 }}
			>
				Lorem Ipsum
			</div>
			<div
				className={`test-full-block test-slide ${hover && 'test-slide-hover'}`}
			>
			</div>
			<div
				className="test-full-block"
				style={{ color: '#fff', fontSize: 26, opacity: hover ? 1 : 0, transition: 'opacity 0.4s' }}
				onMouseOver={toggleHover(true)}
				onMouseLeave={toggleHover(false)}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</div>
		</div>
		);
}