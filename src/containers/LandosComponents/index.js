import React, { useCallback, useEffect, useRef } from 'react';
import './styles.css';

import Button3 from '../../components/Button3';

export default function LandosComponents(props) {

	const lock = useRef(null);

	const handleMouseMove = useCallback((e) => {
		if (lock.current) return;
		lock.current = true;
		requestAnimationFrame(() => {
			const cube = document.getElementById('comp-cube');
			if (!cube) return;
	
			const xDiff = e.clientX - cube.getBoundingClientRect().x - cube.clientWidth/2;
			const yDiff = e.clientY - cube.getBoundingClientRect().y - cube.clientHeight/2;
	
			const yRotate = xDiff / window.innerWidth * 90;
			const xRotate = yDiff / window.innerHeight * 90 * -1;
			cube.style = `transform: rotateY(${yRotate}deg) rotateX(${xRotate}deg)`;
			lock.current = false;
		});
	}, [])

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [handleMouseMove]);

	return (
		<div className="comp-root" >
			{/* <div className='comp-scene' >
				<div className='comp-cube' id='comp-cube'>
					<div className='comp-cube-face comp-cube-front'>&nbsp;0&nbsp;0<br />\___/</div>
					<div className='comp-cube-face comp-cube-back'>back</div>
					<div className='comp-cube-face comp-cube-left'>left</div>
					<div className='comp-cube-face comp-cube-right'>right</div>
					<div className='comp-cube-face comp-cube-bottom'>bottom</div>
					<div className='comp-cube-face comp-cube-top'>top</div>
				</div>
			</div> */}

			<div style={{ position: 'absolute', top: 50, left: 100 }} >
				<Button3></Button3>
			</div>

		</div>
		);
}