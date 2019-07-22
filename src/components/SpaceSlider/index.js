import React from 'react';
import './styles.css';

import Slider from '../Slider';

class SpaceSlider extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			variant: 'all',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		}
	}

	switchVariant = () => {
		if (this.state.variant === 'all') {
			this.setState({ variant: 'twos' });
		} else if (this.state.variant === 'twos') {
			this.setState({ variant: 'ones' });
		} else {
			this.setState({ variant: 'all' })
		}
	}

	getVariantTitle = () => {
		switch(this.state.variant) {
			case 'all':
				return <p className="space-slider-title">all</p>;
			case 'twos':
				return (
					<React.Fragment>
						<p className="space-slider-title">top-bottom</p>
						<p className="space-slider-title">left-right</p>
					</React.Fragment>
					);
			case 'ones':
				return (
					<React.Fragment>
						<p className="space-slider-title">top</p>
						<p className="space-slider-title">right</p>
						<p className="space-slider-title">bottom</p>
						<p className="space-slider-title">left</p>
					</React.Fragment>
					);
			default:
				return '';
		}
	}

	getVariantSliders = () => {
		switch(this.state.variant) {
			case 'all':
				return (
					<Slider title="height" min={0} max={250} value={20}/>
					);
			case 'twos':
				return (
					<React.Fragment>
						<div style={{ maxWidth: '50%' }}>
							<Slider min={0} max={250} value={20}/>
						</div>
							<Slider min={0} max={250} value={20}/>
					</React.Fragment>
					);
			case 'ones':
				return (
					<React.Fragment>
						<p className="space-slider-title">top</p>
						<p className="space-slider-title">right</p>
						<p className="space-slider-title">bottom</p>
						<p className="space-slider-title">left</p>
					</React.Fragment>
					);
			default:
				return '';
		}
	}

	render() {
		const { title } = this.props;
		return (
			<div>
				<div>
					<p className="space-slider-title">
						{title}
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}
						onClick={this.switchVariant}
					>
						{this.getVariantTitle()}
					</div>
				</div>
				<div style={{ display: 'flex' }} >
					{this.getVariantSliders()}
				</div>
			</div>
			);
	}

}

export default SpaceSlider;