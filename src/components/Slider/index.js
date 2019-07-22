import React from 'react';
import './styles.css';

export default function Slider(props) {
	const { min, max, value, onChange, title } = props;
	return (
		<div className="slider-root">
			{title &&
				<div style={{ display: 'flex' }}>
					<p className="slider-title">{`${title}: `}</p>
					<input
						value={value}
						className="slider-input"
						onChange={onChange}
					/>
				</div>
			}
			<div style={{ display: 'flex', alignItems: 'center' }} >
				<div
					className="slider-increment-buttons"
					onClick={() => {onChange({ target: { value: value-1 } } )}}
				>
					-
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
				<div
					className="slider-increment-buttons"
					onClick={() => {onChange({ target: { value: value+1 } } )}}
				>
					+
				</div>
			</div>
		</div>
		);
}