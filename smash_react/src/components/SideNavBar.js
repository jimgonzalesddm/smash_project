import React from 'react';
import './SideNavBar.css';

function SideNavBar() {
	return(
		<div id="mySidenav" className="sidenav">
			  <a href="#" id="home">HOME</a>
			  <a href="#" id="book-online">BOOK A COURT</a>
		
			  <a href="/login" 
			  		id="login" 
			  		data-toggle="modal" 
			  		data-target="#modalLRForm">
			  		LOGIN
			  </a>
			</div>
	);
}

export default SideNavBar;