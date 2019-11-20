function parseIntNaN(val) {
	if (isNaN(parseInt(val))) return 0;
	return parseInt(val);
}


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
			{ label: 'autoxauto', style: { width: 'auto', height: 'auto' } },
			{ label: 'unset', style: { width: undefined, height: undefined } }
		],
		customStyles: [
			{ label: 'width', inputType: 'number', conversion: parseIntNaN },
			{ label: 'height', inputType: 'number', conversion: parseIntNaN },
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
			{ label: 'none', style: { borderStyle: 'none',  } },
			{ label: 'unset', style: { borderStyle: undefined,  } },
		],
	},
	{
		label: 'Border Width',
		baseStyles: {
			...labelStyles,
			minWidth: 50,
			minHeight: 50,
			height: 50,
			border: '0px solid #000',
		},
		allStyles: [
			{ label: '0px', style: { borderWidth: 0 } },
			{ label: '1px', style: { borderWidth: 1 } },
			{ label: '2px', style: { borderWidth: 2 } },
			{ label: '3px', style: { borderWidth: 3 } },
			{ label: '4px', style: { borderWidth: 4 } },
			{ label: '6px', style: { borderWidth: 6 } },
			{ label: '10px', style: { borderWidth: 10 } },
		],
		customStyles: [
			{ label: 'borderWidth', inputType: 'number', conversion: parseIntNaN },
		],
	},
	{
		label: 'Border Color',
		baseStyles: {
			...labelStyles,
			minWidth: 50,
			minHeight: 50,
			height: 50,
			border: '2px solid',
		},
		allStyles: [
			{ label: '#000000', style: { borderColor: '#000000' } },
			{ label: '#ff0000', style: { borderColor: '#ff0000' } },
			{ label: '#0000ff', style: { borderColor: '#0000ff' } },
			{ label: '#ffff00', style: { borderColor: '#ffff00' } },
		],
		customStyles: [
			{ label: 'borderColor', inputType: 'color' },
		],
	},
	{
		label: 'Box Shadow',
		baseStyles: {
			...labelStyles,
			minWidth: 50,
			minHeight: 50,
		},
		allStyles: [
			{ label: '#1', style: { boxShadow: '0px 2px 3px #575757' } },
			{ label: '#2', style: { boxShadow: '0px 3px 4px #575757' } },
			{ label: '#3', style: { boxShadow: '0px 2px 5px #575757' } },
			{ label: '#4', style: { boxShadow: '0px 2px 6px #575757' } },
			{ label: '#5', style: { boxShadow: '0px 1px 8px #575757' } },
			{ label: '#6', style: { boxShadow: '-2px 2px 4px #575757' } },
			{ label: '#7', style: { boxShadow: '2px 2px 4px #575757' } },
			{ label: '#8', style: { boxShadow: '2px 2px 0px 2px #575757' } },
			{ label: '#9', style: { boxShadow: '1px 1px 0px 2px #575757' } },
		],
	},
	{
		label: 'Padding',
		baseStyles: {
			...labelStyles,
			border: '1px solid black',
			height: 'fit-content',
		},
		allStyles: [
			{ label: '0px', style: { padding: 0 } },
			{ label: '1px', style: { padding: 1 } },
			{ label: '2px', style: { padding: 2 } },
			{ label: '3px', style: { padding: 3 } },
			{ label: '4px', style: { padding: 4 } },
			{ label: '5px', style: { padding: 5 } },
			{ label: '6px', style: { padding: 6 } },
			{ label: '8px', style: { padding: 8 } },
			{ label: '10px', style: { padding: 10 } },
			{ label: '15px', style: { padding: 15 } },
			{ label: '20px', style: { padding: 20 } },
			{ label: '40px', style: { padding: 40 } },
		],
		customStyles: [
			{ label: 'padding', inputType: 'number', conversion: parseIntNaN },
		],
	},
	{
		label: 'Margin',
		baseStyles: {
			...labelStyles,
			border: '1px solid #ccc',
			height: 'fit-content',
		},
		allStyles: [
			{ label: '0px', style: { margin: 0 } },
			{ label: '1px', style: { margin: 1 } },
			{ label: '2px', style: { margin: 2 } },
			{ label: '3px', style: { margin: 3 } },
			{ label: '4px', style: { margin: 4 } },
			{ label: '5px', style: { margin: 5 } },
			{ label: '6px', style: { margin: 6 } },
			{ label: '8px', style: { margin: 8 } },
			{ label: '10px', style: { margin: 10 } },
			{ label: '15px', style: { margin: 15 } },
			{ label: '20px', style: { margin: 20 } },
			{ label: '40px', style: { margin: 40 } },
		],
		customStyles: [
			{ label: 'margin', inputType: 'number', conversion: parseIntNaN },
		],
	},
	{
		label: 'Display',
		baseStyles: {
			...labelStyles,
			border: '1px solid #ccc',
			height: 'fit-content',
		},
		allStyles: [
			{ label: 'flex-row', style: { display: 'flex', flexDirection: 'row' } },
			{ label: 'flex-column', style: { display: 'flex', flexDirection: 'column' } },
			{ label: 'block', style: { display: 'block' } },
			{ label: 'inline', style: { display: 'inline' } },
		],
	},
	{
		label: 'Font Size',
		baseStyles: {
			...labelStyles,
			border: '1px solid #ccc',
			height: 'fit-content',
		},
		allStyles: [
			{ label: '12px', style: { fontSize: 12 } },
			{ label: '14px', style: { fontSize: 14 } },
			{ label: '16px', style: { fontSize: 16 } },
			{ label: '18px', style: { fontSize: 18 } },
			{ label: '24px', style: { fontSize: 24 } },
			{ label: '30px', style: { fontSize: 30 } },
			{ label: '36px', style: { fontSize: 36 } },
			{ label: '42px', style: { fontSize: 42 } },
			{ newLine: true },
			{ label: '0.5rem', style: { fontSize: '0.5rem' } },
			{ label: '1rem', style: { fontSize: '1rem' } },
			{ label: '1.5rem', style: { fontSize: '1.5rem' } },
			{ label: '2rem', style: { fontSize: '2rem' } },
			{ label: '2.5rem', style: { fontSize: '2.5rem' } },
			{ label: '3rem', style: { fontSize: '3rem' } },
		],
		customStyles: [
			{ label: 'fontSize', inputType: 'number', conversion: parseIntNaN },
		],
	},
]


export default BANK;