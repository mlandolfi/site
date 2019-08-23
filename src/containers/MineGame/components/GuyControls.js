import React from 'react';

import { BOARD_HEIGHT } from './Grid';

const styles = {
	root: {
		width: 300,
		height: BOARD_HEIGHT,
		border: '2px solid black',
		display: 'flex',
		flexDirection: 'column',
	},
	actionButton: {
		cursor: 'pointer',
		width: 100,
		height: 50,
		border: '2px solid black',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
		textTransform: 'uppercase',
	},
	inventoryItem: {
		fontSize: 16,
		padding: 20,
	},
}

export default function GuyControls(props) {
	const { worker } = props;

	return (
		<div
			style={styles.root}
		>
			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				Actions
				<div
					style={styles.actionButton}
					onClick={props.onDig}
				>
					Dig
				</div>
				<div
					style={styles.actionButton}
					onClick={props.onPan}
				>
					Pan
				</div>
			</div>
			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				Inventory
				<div style={styles.inventoryItem}>
					Gold: {props.goldTotal.toFixed(3)}
				</div>
				{worker.inventory.map((item, index) => (
					<div
						key={`inventory-item-${index}`}
						style={styles.inventoryItem}
					>
						{item.toString()}
					</div>
					))}
			</div>
		</div>
		);
}