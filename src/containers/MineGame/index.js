import React from 'react';

import Grid from './components/Grid';
import GuyControls from './components/GuyControls';
import Worker from './objects/Worker';
import Bucket from './objects/Bucket';
import TheMap, { MAP_WIDTH, MAP_LENGTH } from './Map';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.mainWorker = new Worker('Mike', [new Bucket(5)]);
		this.state = {
			fluidMap: TheMap,
			mainWorkerIndex: -1,
			goldTotal: 0,
		}
	}

	componentDidMount() {
		const { fluidMap } = this.state;
		const newMap = fluidMap.slice();
		newMap[12].workerArrived(this.mainWorker);
		this.setState({ fluidMap: newMap, mainWorkerIndex: 12 })
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	mainWorkerDig = () => {
		const newMap = this.state.fluidMap.slice();
		// checking to make sure we can hit the square and store it
		const prospect = newMap[this.state.mainWorkerIndex].prospectHit();
		const bucketToStore = this.mainWorker.getBucketToStorePile(prospect);
		if (!bucketToStore)
			return;
		// now we actually hit the square
		const pileFromHit = newMap[this.state.mainWorkerIndex].hit();
		// add the pile to the bucket for storage
		bucketToStore.addPile(pileFromHit);

		this.setState({ fluidMap: newMap });
	}

	mainWorkerPan = () => {
		console.log(this.mainWorker)
		const bucket = this.mainWorker.getBucketToPan();
		if (!bucket)
			return;
		const takings = bucket.takePile(0.3).process();
		this.setState({ goldTotal: this.state.goldTotal + takings.gold });
	}

	canMoveMainWorker = (index) => {
		const start = this.state.fluidMap[this.state.mainWorkerIndex];
		const end = this.state.fluidMap[index];
		console.log(start);
		console.log(end);
		console.log(this.state.mainWorkerIndex);
		const heightDiff = Math.abs(start.height - end.height);
		return heightDiff <= 2 && end.waterHeight <= 1;
	}

	moveMainWorker = (index) => {
		const newMap = this.state.fluidMap.slice();
		newMap[this.state.mainWorkerIndex].workerLeft();
		newMap[index].workerArrived(this.mainWorker);
		this.setState({ mainWorkerIndex: index, fluidMap: newMap });
	}

	handleKeyDown = (event) => {
		if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
			event.stopPropagation();
			event.preventDefault();
			const { mainWorkerIndex, fluidMap } = this.state;
			let moveToIndex = -1;
			// ----------------- ArrowUp ----------------- //
			if (event.key === 'ArrowUp') {
				if (mainWorkerIndex < MAP_WIDTH)	// at the top of the map
					return;
				moveToIndex = mainWorkerIndex - MAP_WIDTH;
			}
			// ----------------- ArrowRight ----------------- //
			else if (event.key === 'ArrowRight') {
				if (mainWorkerIndex % 6 === 5)	// at the right of the map
					return;
				moveToIndex = mainWorkerIndex + 1;
			}
			// ----------------- ArrowDown ----------------- //
			else if (event.key === 'ArrowDown') {
				if (mainWorkerIndex > MAP_WIDTH*MAP_LENGTH-MAP_WIDTH)	// at the bottom of the map
					return;
				moveToIndex = mainWorkerIndex + MAP_WIDTH;
			}
			// ----------------- ArrowLeft ----------------- //
			else if (event.key === 'ArrowLeft') {
				if (mainWorkerIndex % 6 === 0)	// at the left of the map
					return;
				moveToIndex = mainWorkerIndex - 1;
			}
			if (moveToIndex !== -1 && this.canMoveMainWorker(moveToIndex)) {
				this.moveMainWorker(moveToIndex)
			}
		}
	}

	render() {
	const { fluidMap, goldTotal } = this.state;
	return (
		<div
			style={{
				width: 'calc(100vw)',
				height: 'calc(100vh)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<GuyControls
				onDig={this.mainWorkerDig}
				onPan={this.mainWorkerPan}
				worker={this.mainWorker}
				goldTotal={goldTotal}
			/>
			<Grid
				squares={fluidMap}
				width={MAP_WIDTH}
				length={MAP_LENGTH}
			/>
		</div>
	);
}

}
