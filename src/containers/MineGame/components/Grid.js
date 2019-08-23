import React from 'react';
import PropTypes from 'prop-types';

export const BOARD_WIDTH = 1000;
export const BOARD_HEIGHT = 800;

export default class Grid extends React.PureComponent {

	render() {
		const { width, length, squares } = this.props;
		const showWidth = Math.floor(BOARD_WIDTH / width - 2);
		console.log("GRID RENDERING");
		return (
			<div
				style={{
					width: BOARD_WIDTH,
					height: BOARD_HEIGHT,
					overflow: 'scroll',
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
				}}
			>
				{squares.map((square, index) => {
					return (
						<div
							key={`square-${index}`}
							style={{
								width: showWidth,
								height: showWidth,
								backgroundColor: square.getColor(),
								borderWidth: 1,
								borderColor: 'black',
								cursor: 'pointer',
								border: '1px solid black',
							}}
						>
							<p>{square.getText()}</p>
						</div>
						);
				})}
			</div>
		);
	}
}
Grid.propTypes = {
	squares: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
}