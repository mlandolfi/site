import React from 'react';

import './styles.css'

import POB from './POB';

export default class Particles extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			num: 200,
			minR: 4,
			maxR: 8,
			lineDist: 150,
		};
		this.drawLines = true;
		this.onInterval = this.onInterval.bind(this);
	}

	onInterval() {
		if (!Object.isExtensible(this.context))	return;
		requestAnimationFrame(this.onInterval);
		// clearing the canvas
		this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		// drawing the particles themselves
		this.context.fillStyle = "#22A29F";
		this.bois.forEach((bp) => {
			this.context.beginPath();
			const [ x, y ] = bp.moveAndGet();
			this.context.arc(x, y, bp.radius, 0, 2*Math.PI);
			this.context.closePath();
			// this.context.fillStyle = `rgba(255, 255, 255, ${bp.radius / this.state.maxR})`
			this.context.fill();
		});
		if (!this.drawLines)	return;
		// now to draw the lines between them
		this.bois.forEach((outer) => {
			this.bois.forEach((inner) => {
				const pointDist = Math.sqrt(Math.pow(outer.x-inner.x, 2)+Math.pow(outer.y-inner.y, 2));
				if (pointDist < this.state.lineDist && !(outer.x === inner.x && outer.y === inner.y)) {
					this.context.strokeStyle = `rgba(34, 162, 159, ${1 - pointDist / this.state.lineDist})`;
					this.context.beginPath();
					this.context.moveTo(outer.x, outer.y);
					this.context.lineTo(inner.x, inner.y);
					this.context.stroke();
					this.context.closePath();
				}
			})
		})
	}

	componentDidMount() {
		const canvas = document.getElementById('particles-canvas-root');
		this.context = canvas.getContext('2d');
		this.context.fillStyle = "#000";
		this.bois = [];
		const lineDist = this.state.lineDist;
		for (let i=0; i<this.state.num; i++) {
			const temp = new POB(window.innerWidth, window.innerHeight, this.state.maxR, this.state.minR, 0.7, this.state.lineDist);
			this.context.beginPath();
			const [ x, y ] = temp.moveAndGet();
			this.context.arc(x, y, temp.radius, 0, 2*Math.PI);
			this.context.closePath();
			this.context.fill();
			this.bois.push(temp);
		}

		// this.interval = setInterval(window.requestAnimationFrame(this.onInterval), 30);
		this.interval = window.requestAnimationFrame(this.onInterval);
	}

	componentWillUnmount() {
		// clearInterval(this.interval);
		window.cancelAnimationFrame(this.interval);
	}

	render() {
		return (
			<div className="particles-root">
				<canvas width={window.innerWidth} height={window.innerHeight} id="particles-canvas-root" />
				<div className="particles-version">
					Particles v1.0
				</div>
			</div>);
	}


}