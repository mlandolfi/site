import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import './styles.css';

export default function Button3(props) {

	const handleAdjustment = useCallback(() => {
		const cube = document.getElementById('cube3-cube');
		const root = document.getElementById('button3-root');

		const xCoord = root.getBoundingClientRect().x;
		const yCoord = root.getBoundingClientRect().y;

		const yRotate = xCoord / window.innerWidth * 90;
		const xRotate = yCoord / window.innerHeight * 90;
		console.log(xCoord, yCoord)
		cube.style = `transform: rotateY(${yRotate}deg) rotateX(${xRotate}deg)`;
	}, [])

	useLayoutEffect(() => {
		handleAdjustment();
		window.addEventListener('resize', handleAdjustment);
		return () => window.removeEventListener('resize', handleAdjustment);
	}, [handleAdjustment])

	return (			
			<div id='button3-root' className='cube3-scene' >
				<div className='cube3-cube' id='cube3-cube'>
					<div className='cube3-cube-face cube3-cube-front'>front</div>
					<div className='cube3-cube-face cube3-cube-back'>back</div>
					<div className='cube3-cube-face cube3-cube-left'>left</div>
					<div className='cube3-cube-face cube3-cube-right'>right</div>
					<div className='cube3-cube-face cube3-cube-bottom'>bottom</div>
					<div className='cube3-cube-face cube3-cube-top'>top</div>
				</div>
			</div>
		);
}