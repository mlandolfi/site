import React from 'react';

export const DownloadIcon = ({ color, size, style }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 100 100"
		style={style}
	>
		<rect
			x="43"
			y="28"
			width="14"
			height="40"
			fill={color}
		/>
		<polygon
			points="30,55 50,78 70,55"
			fill={color}
		/>
		<circle
			cx="50"
			cy="50"
			r="40"
			stroke={color ? color : '#000'}
			strokeWidth="6"
			fill="none"
		/>
	</svg>
	);