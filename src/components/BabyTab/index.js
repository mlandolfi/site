import React from 'react';

import styles from './styles.css';

export default function BabyTab(props) {
	const { value, selected, onClick, position, style } = props;

	const onSelect = () => {onClick(value)};

	return (
		<div
			className={`baby-tab-root ${selected ? 'baby-tab-selected' : ''}`}
			style={{ ...style, ...position }}
			onClick={onSelect}
		>
			{value}
		</div>);
}