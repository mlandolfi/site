import React from 'react';
import './styles.css'

export default function Nav(props) {
	return (
		<div
			className="nav-root"
			id={props.styleId}
			onClick={() => props.onClick(props.label, props.color)}
			style={props.selected ? { color: props.color, borderColor: props.color } : {}}
		>
			{props.label}
		</div>
		)
}