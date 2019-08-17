import React from 'react';
import './styles.css';

export default function MapLocation(props) {
	return (
		<div
			className="map-location-root"
			onClick={props.onClick}
		>
			<div className="map-dash" />
			<p
				className="map-location-text on-text"
				style={props.selected ? {color: '#f2efe0'} : {}}
			>
				{props.label}
			</p>
		</div>
		)
}