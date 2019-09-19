import React from 'react';

const labelStyles = {
	padding: 8,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const BANK = [
	{
		label: 'Sizing',
		baseStyles: {
			...labelStyles,
			border: '1px solid black',
		},
		allStyles: [
			{ label: '20x20', style: { width: 20, height: 20 } },
			{ label: '50x50', style: { width: 50, height: 50 } },
			{ label: '100x100', style: { width: 100, height: 100 } },
			{ label: '80x80', style: { width: 80, height: 80 } },
			{ label: '200x40', style: { width: 200, height: 80 } },
			{ label: 'unset', style: { width: undefined, height: undefined } }
		],
		customStyles: [
			{ label: 'width', conversion: parseInt },
			{ label: 'height', conversion: parseInt },
		],
	},
	{
		label: 'Border Style',
		baseStyles: {
			...labelStyles,
			minWidth: 50,
			minHeight: 50,
			border: '2px solid #000',
		},
		allStyles: [
			{ label: 'dotted', style: { borderStyle: 'dotted' } },
			{ label: 'dashed', style: { borderStyle: 'dashed' } },
			{ label: 'solid', style: { borderStyle: 'solid' } },
			{ label: 'groove', style: { borderStyle: 'groove' } },
			{ label: 'ridge', style: { borderStyle: 'ridge' } },
			{ label: 'inset', style: { borderStyle: 'inset' } },
			{ label: 'outset', style: { borderStyle: 'outset' } },
			{ label: 'unset', style: { borderStyle: undefined,  } },
		],
	},
]

export default BANK;