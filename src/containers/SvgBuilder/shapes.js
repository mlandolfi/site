import React from 'react';

const attributes = {

	width: (def) => ({ label: 'width', default: def }),
	height: (def) => ({ label: 'height', default: def }),
	x: (def) => ({ label: 'x', default: def }),
	y: (def) => ({ label: 'y', default: def }),
	rx: (def) => ({ label: 'rx', default: def }),
	ry: (def) => ({ label: 'ry', default: def }),
}


const SHAPES = {
	rectangle: {
		label: 'rectangle',
		component: (props) => <rect {...props} />,
	},
	circle: {
		label: 'circle',
		component: (props) => <circle {...props} />,
	},
	ellipse: {
		label: 'ellipse',
		component: (props) => <ellipse {...props} />,
	},
	line: {
		label: 'line',
		component: (props) => <line {...props} />,
	},
	text: {
		label: 'text',
		component: (props) => <text {...props} >{props.value}</text>,
	},
}

export default SHAPES;