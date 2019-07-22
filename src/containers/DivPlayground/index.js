import React from 'react';
import './styles.css';

import Slider from '../../components/Slider';
import SpaceSlider from '../../components/SpaceSlider';

const containerTypes = ['div', 'button', 'span', 'input', 'p', 'a', 'ul', 'ol'];

const defaultStyles = {
	
}

class DivPlayground extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			containerType: 'div',
			stylesCopied: '',

			boxShadow: {
				active: true,
				hLength: 0,
				vLength: 0,
				blur: 0,
				spread: 0,
			},
			sizing: {
				width: 50,
				height: 50,
			},
		}
	}

	composeStyles = (onlyEditable=false) => {
		const { boxShadow } = this.state;

		const tempStyles = { backgroundColor: '#fff' };

		if (boxShadow.active)
			tempStyles.boxShadow = `${boxShadow.hLength}px ${boxShadow.vLength}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(0,0,0,0.4)`

		tempStyles.width = this.state.sizing.width;
		tempStyles.height = this.state.sizing.height;

		if (onlyEditable)
			return tempStyles;

		return Object.assign({}, defaultStyles, tempStyles);
	}

	numStyles = () => Object.keys(this.composeStyles(true)).length;

	dashCamelCase = (camel) => {
		let dashed = '';
		for (let i=0; i<camel.length; i++) {
			if (camel.charCodeAt(i) > 65 && camel.charCodeAt(i) < 90) {
				dashed += `-${camel[i].toLowerCase()}`;
			} else {
				dashed += camel[i];
			}
		}
		return dashed;
	}

	createJSSString = () => {
		const styles = this.composeStyles(true);
		let retVal = `${this.state.containerType}Class: {\n`;
		Object.keys(styles).forEach((styleKey) => {
			const wrapWithQuotes = typeof styles[styleKey] === 'string';
			retVal += `  ${styleKey}: ${wrapWithQuotes ? '\'' : ''}${styles[styleKey]}${wrapWithQuotes ? '\'' : ''},\n`;
		})
		retVal += '}'
		return retVal;
	}

	createCSSString = () => {
		const styles = this.composeStyles(true);
		let retVal = `.${this.state.containerType}-class {\n`;
		Object.keys(styles).forEach((styleKey) => {
			retVal += `  ${this.dashCamelCase(styleKey)}: ${styles[styleKey]};\n`;
		})
		retVal += '}'
		return retVal;
	}

	renderContainer = () => {
		const { containerType } = this.state;
		const styling  = this.composeStyles();
		switch(containerType) {
			case 'div':
				return <div style={styling} />;
			case 'button':
				return <button style={styling} />;
			case 'span':
				return <span style={styling} />
			case 'input':
				return <input style={styling} />
			case 'p':
				return <p style={styling}>lorem ipsum</p>
			case 'a':
				return <a href="#playground-root" style={styling}>lorem ipsum</a>
			case 'ul':
				return (
					<ul style={styling}>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
					</ul>
					);
			case 'ol':
				return (
					<ol style={styling}>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
					</ol>
					);
			default:
				return <div style={styling} />
		}
	}

	changeStateEvent = (key, value) => (event) => {
		this.setState({ [key]: value });
	}

	nestedStateChange = (key, secondKey, value) => {
		this.setState({ [key]: Object.assign({}, this.state[key], { [secondKey]: value }) });
	}

	copyStyle = (id) => () => {
		const element = document.getElementById(id)
		element.select();
		document.execCommand("copy");
		element.classList.add('style-text-copied');
		this.setState({ stylesCopied: id })
		if (window.getSelection) { // All browsers, except IE <=8
			window.getSelection().removeAllRanges();
		}	else if (document.selection) { // IE <=8
			document.selection.empty();
		}
		setTimeout(() => {
			element.classList.remove('style-text-copied');
			this.setState({ stylesCopied: '' })
		}, 1500)
	}

	render() {
		const { containerType, stylesCopied } = this.state;
		return (
			<div id="playground-root">
				<a id="playground-title" href="#playground-root">{containerType} playground</a>
				<div className="playground-horiz-panel">
					{containerTypes.map((cot) => (
						<div
							key={`playground-cot-${cot}`}
							className={`cot-button ${cot===containerType ? 'cot-button-selected' : ''}`}
							onClick={this.changeStateEvent('containerType', cot)}
						>
							{`${cot}`}
						</div>
						))}
				</div>
				<div className="playground-horiz-panel">
					<div className="playground-verti-panel">
						<h1 className="style-text-header">JSS</h1>
						<textarea
							readOnly
							id="jss-text-area"
							spellCheck="false"
							rows={this.numStyles()+4}
							value={this.createJSSString()}
							className="style-text"
							onClick={this.copyStyle('jss-text-area')}
						/>
						<h2
							className="copied-header"
							onClick={this.copyStyle('jss-text-area')}
						>
							{stylesCopied === 'jss-text-area' ? 'copied' : 'copy'}
						</h2>
					</div>
					<div id="container-wrapper">
						{this.renderContainer()}
					</div>
					<div className="playground-verti-panel">
						<h1 className="style-text-header">CSS</h1>
						<textarea
							readOnly
							id="css-text-area"
							spellCheck="false"
							rows={this.numStyles()+4}
							value={this.createCSSString()}
							className="style-text"
							onClick={this.copyStyle('css-text-area')}
						/>
						<h2
							className="copied-header"
							onClick={this.copyStyle('css-text-area')}
						>
							{stylesCopied === 'css-text-area' ? 'copied' : 'copy'}
						</h2>
					</div>
				</div>
				<div className="playground-horiz-panel">
					<div className="control-container">
						<h3 className="control-header">shadow</h3>
						<Slider
							title="h-length"
							min={-50}
							max={50}
							value={this.state.boxShadow.hLength}
							onChange={(event) => this.nestedStateChange('boxShadow', 'hLength', event.target.value)}
						/>
						<Slider
							title="v-length"
							min={-50}
							max={50}
							value={this.state.boxShadow.vLength}
							onChange={(event) => this.nestedStateChange('boxShadow', 'vLength', event.target.value)}
						/>
						<Slider
							title="blur"
							min={0}
							max={100}
							value={this.state.boxShadow.blur}
							onChange={(event) => this.nestedStateChange('boxShadow', 'blur', event.target.value)}
						/>
						<Slider
							title="spread"
							min={0}
							max={100}
							value={this.state.boxShadow.spread}
							onChange={(event) => this.nestedStateChange('boxShadow', 'spread', event.target.value)}
						/>
					</div>
					<div className="control-container">
						<h3 className="control-header">sizing</h3>
						<Slider
							title="width"
							min={0}
							max={400}
							value={this.state.sizing.width}
							onChange={(event) => this.nestedStateChange('sizing', 'width', parseInt(event.target.value))}
						/>
						<Slider
							title="height"
							min={0}
							max={250}
							value={this.state.sizing.height}
							onChange={(event) => this.nestedStateChange('sizing', 'height', parseInt(event.target.value))}
						/>
						<SpaceSlider title="padding" />
					</div>
				</div>
			</div>
			);
	}
}

export default DivPlayground;
