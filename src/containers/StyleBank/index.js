import React from 'react';
import './styles.css';

import FOOTER_HEIGHT from '../../components/Footer';

import Bank from './data';

import { SearchIcon } from '../../assets/icons';


class StyleBank extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			appliedStyles: {
				backgroundColor: '#ffffff'
			},
			containerType: 'div',
			filter: "",
			stylesCopied: false,
		};
	}

	createJSSString = () => {
		const { appliedStyles } = this.state;
		let retVal = `${this.state.containerType}Class: {\n`;
		Object.keys(appliedStyles).forEach((styleKey) => {
			const wrapWithQuotes = typeof appliedStyles[styleKey] === 'string';
			retVal += `  ${styleKey}: ${wrapWithQuotes ? '\'' : ''}${appliedStyles[styleKey]}${wrapWithQuotes ? '\'' : ''},\n`;
		})
		retVal += '}'
		return retVal;
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

	handleSearch = (e) => {
		this.setState({ filter: e.target.value });
	}

	checkStylesForMatch = (styles, toMatch) => {
		if (styles.label.toLowerCase().indexOf(toMatch) !== -1)	// check the label
			return true;

		let hasMatched = false;
		styles.allStyles.forEach((style) => {	// check allStyles
			Object.keys(style.style).forEach((key) => {
				if (key.toLowerCase().indexOf(toMatch) !== -1)
					hasMatched = true;
				else if (typeof style.style[key] === 'string' && style.style[key].toLowerCase().indexOf(toMatch) !== -1)
					hasMatched = true;
			});
		});
		if (hasMatched)
			return hasMatched;

		if ('customStyles' in Object.keys(styles)) {
			styles.customStyles.forEach((s) => {
				if (s.label.toLowerCase().indexOf(toMatch) !== -1)
					hasMatched = true;
			});
		}

		return hasMatched;
	}

	getFilteredBank = () => {
		const { filter } = this.state;
		if (filter.length == 0)
			return Bank;

		return Bank.filter(styles => this.checkStylesForMatch(styles, filter));
	}

	copyStyle = () => {
		const element = document.getElementById('jss-text-area');
		element.select();
		document.execCommand("copy");
		element.classList.add('bank-style-copy-copied');
		this.setState({ stylesCopied: true });
		if (window.getSelection) { // All browsers, except IE <=8
			window.getSelection().removeAllRanges();
		}	else if (document.selection) { // IE <=8
			document.selection.empty();
		}
		setTimeout(() => {
			element.classList.remove('bank-style-copy-copied');
			this.setState({ stylesCopied: false });
		}, 1500)
	}

	renderContainer = () => {
		const { containerType, appliedStyles } = this.state;
		switch(containerType) {
			case 'div':
				return <div style={appliedStyles} />;
			case 'button':
				return <button style={appliedStyles} />;
			case 'span':
				return <span style={appliedStyles} />
			case 'input':
				return <input style={appliedStyles} />
			case 'p':
				return <p style={appliedStyles}>lorem ipsum</p>
			case 'a':
				return <a href="#playground-root" style={appliedStyles}>lorem ipsum</a>
			case 'ul':
				return (
					<ul style={appliedStyles}>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
					</ul>
					);
			case 'ol':
				return (
					<ol style={appliedStyles}>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
						<li>lorem ipsum</li>
					</ol>
					);
			default:
				return <div style={appliedStyles} />
		}
	}

	render() {
		const { appliedStyles, stylesCopied } = this.state;
		return (
			<div className="bank-root">
				<div className="bank-header">
					<div>
						<textarea
							readOnly
							id="jss-text-area"
							spellCheck="false"
							rows={Object.keys(appliedStyles).length+2}
							value={this.createJSSString()}
							className="bank-style-copy"
							onClick={this.copyStyle.bind(this)}
						/>
						<p
							className="bank-copy-text"
							onClick={this.copyStyle.bind(this)}
						>
							{stylesCopied ? "Copied" : "Copy"}
							</p>
					</div>
					<div className="bank-preivew-container">
						{this.renderContainer()}
					</div>
				</div>
				<div className="bank-search-spacer">
					<div className="bank-search-container">
						<SearchIcon size={25} color={"#22A29F"} />
						<input
							type="txt"
							className="bank-search-input"
							onChange={this.handleSearch.bind(this)}
						/>
					</div>
				</div>
				<div className="bank-bank">
					{this.getFilteredBank().map((section) => (
						<React.Fragment key={section.label}>
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
									<p className="bank-custom-header on-text">Custom: {section.customLabel && section.customLabel}</p>
									{section.customStyles.map(({ label, conversion, inputType }) => (
										<div style={{ display: 'flex', margin: 5, }} key={`custom-${section}-${label}`}>
											<p className="on-text" style={{ width: 150 }}>{label}:</p>
											<input
												onChange={(e) => this.handleCustomInput(label, e.target.value, conversion)}
												type={inputType ? inputType : 'txt'}
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