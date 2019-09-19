import React from 'react';
import './styles.css';

import Bank from './data';


class StyleBank extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			appliedStyles: {

			},
		};
	}

	handleCustomInput = (style, value, conversion) => {
		this.setState({
			appliedStyles: {
				...this.state.appliedStyles,
				[style]: conversion ? conversion(value) : value,
			}
		})
	}

	handleApplyStyles = (style) => {
		this.setState({
			appliedStyles: {
				...this.state.appliedStyles,
				...style,
			},
		})
	}

	render() {
		const { appliedStyles } = this.state;
		console.log(appliedStyles)
		return (
			<div className="bank-root">
				<div className="bank-preivew-container">
					<div
						style={{
							background: '#fff',
							...appliedStyles,
						}}
					/>
				</div>
				<div className="bank-bank">
					{Bank.map((section) => (
						<React.Fragment>
							<p className="bank-section-header">{section.label}</p>
							<div style={{ display: 'flex', flexWrap: 'wrap' }} >
								{section.allStyles.map((boi) => (
									<div
										style={{
											...section.baseStyles,
											...boi.style,
											margin: 10,
											cursor: 'pointer',
										}}
										key={`section-style-${boi.label}`}
										onClick={this.handleApplyStyles.bind(this, boi.style)}
									>
										{boi.label}
									</div>
									))}
							</div>
							{section.customStyles &&
								<div className="bank-custom-container">
									<p className="bank-custom-header on-text">Custom</p>
									{section.customStyles.map(({ label, conversion }) => (
										<div style={{ display: 'flex', margin: 5, }} key={`custom-${section}-${label}`}>
											<p className="on-text" style={{ width: 100 }}>{label}:</p>
											<input
												onChange={(e) => this.handleCustomInput(label, e.target.value, conversion)}
											/>
										</div>
										))}
								</div>
							}
						</React.Fragment>
						))}
				</div>
			</div>
			);
	}

}



export default StyleBank