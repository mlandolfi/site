import React from 'react';
import './styles.css';

export default function MapLocation(props) {
	// props.color, props.label, props.onClick
	return (
		<div
			style={{ color: props.selected ? 'rgba(255, 255, 255, 0.6)' : props.color, zIndex: 10 }}
			className="map-location-root"
			onClick={props.onClick}
		>
			<div className="map-dash" />
			<p className="map-location-text" >
				{props.label}
			</p>
		</div>
		)
}