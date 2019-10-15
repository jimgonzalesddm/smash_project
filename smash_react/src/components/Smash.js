import React from 'react';
import { Link, Route } from 'react-router-dom';
import './Smash.css';


function Smash() {
	return(
		<React.Fragment>
			<div className="jumbotron jumbotron-smash mb-0 d-flex justify-content-end">
				<p id="smash-text" className="">
				sma<span id="text-ash">sh</span></p>
				<div id="image-shuttle"></div>
				<div id="half-green" className=""></div>
				
			</div>
			
		
		</React.Fragment>
	);
}

export default Smash;