import React, { useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	section: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		borderColor: '#000',
		borderWidth: 2,
	},
	sectionHeader: {
		textAlign: 'center',
		fontSize: 22,
		textDecorationLine: 'underline',
	},
	actionButton: {
		textAlign: 'center',
		fontSize: 24,
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#000',
	},
	inventoryItem: {
		marginBottom: 10,
	},
})

export default function WorkerControls(props) {
	const { worker } = props;

	return (
		<div style={styles.root} >
			
		</div>
		);
}
WorkerControls.propTypes = {
	worker: PropTypes.object,

	toggleMove: PropTypes.func,
}