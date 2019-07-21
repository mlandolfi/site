import React from 'react';
import './styles.css';

export default function Slider(props) {
	const { min, max, value, onChange, title } = props;

	return (
		<div className="slider-root">
			<div style={{ display: 'flex' }}>
				<p className="slider-title">{`${title}: `}</p>
				<input
					value={value}
					className="slider-input"
					onChange={onChange}
				/>
			</div>
			<input
				type="range"
				min={`${min}`}
				max={`${max}`}
				value={`${value}`}
				className="slider"
				id="myRange"
				onChange={onChange}
			/>
		</div>
		);
}