import React from 'react';
import './styles.css';

import Shapes from './shapes';

export default class SvgBuilder extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			groupIndex: 0,
			groups: [[]],
		}
	}

	addShape = (shapeKey) => (event) => {
		const newGroups = this.state.groups.slice();
		newGroups[this.state.groupIndex].push(shapeKey);
		this.setState({ groupd: newGroups });
	}

	render() {
		const { groups, groupIndex } = this.state;
		return (
			<div className="svgb-root">
				<div className="svgb-wrapper">
					<div className="svgb-controls-container">
						{groups[groupIndex].map((shapeKey) => <div style={{ height: 40, width: '90%' }}>{Shapes[shapeKey].label}</div>)}
						<div
							id="svgb-add-controls"
						>
							{Object.keys(Shapes).map((shapeKey) => {
								const shape = Shapes[shapeKey];
								return (
										<div
											className="svgb-add-shape"
											onClick={this.addShape(shapeKey)}
										>
											{shape.label}
										</div>
									);
							})}
						</div>
					</div>
					<div className="svgb-canvas">
						<svg>

						</svg>
					</div>
					<div className="svgb-styles-container">
					</div>
				</div>
			</div>
			);
	}

}
