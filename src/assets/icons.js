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

export const MailIcon = ({ color, size, style }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 100 100"
		style={style}
	>
		<rect
			x="6"
			y="20"
			width="88"
			height="60"
			stroke={color ? color : '#000'}
			strokeWidth="6"
			fill="none"
		/>
		<line
			x1="6" y1="22"
			x2="51" y2="50"
			stroke={color ? color : '#000'}
			strokeWidth="6"
		/>
		<line
			x1="94" y1="22"
			x2="49" y2="50"
			stroke={color ? color : '#000'}
			strokeWidth="6"
		/>
	</svg>
	);

export const ArrowDownIcon = ({ color, size, style }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 100 50"
		style={style}
	>
		<line
			x1="6" y1="12"
			x2="53" y2="50"
			stroke={color ? color : '#000'}
			strokeWidth="12"
		/>
		<line
			x1="94" y1="12"
			x2="47" y2="50"
			stroke={color ? color : '#000'}
			strokeWidth="12"
		/>
	</svg>
	);