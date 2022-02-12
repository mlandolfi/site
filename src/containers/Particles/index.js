import React from 'react';

import './styles.css'

import POB from './POB';

export default class Particles extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			num: 200,
			minR: 1,
			maxR: 30,
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
		this.context.shadowColor = '#333333';
		this.bois.forEach((bp) => {
			const [ x, y, r ] = bp.moveAndGet();
			this.context.shadowBlur = this.state.maxR+1 - r;
			this.context.beginPath();
			this.context.arc(x, y, r, 0, 2*Math.PI);
			this.context.closePath();

			// this.context.fillStyle = `rgba(255, 255, 255, ${bp.radius / this.state.maxR})`
			this.context.fill();
		});
		this.context.shadowColor = null;
		this.context.shadowBlur = 0;
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
			const temp = new POB(window.innerWidth, window.innerHeight, this.state.maxR, this.state.minR, 2, this.state.lineDist);
			this.context.beginPath();
			const [ x, y, r ] = temp.moveAndGet();
			this.context.arc(x, y, r, 0, 2*Math.PI);
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