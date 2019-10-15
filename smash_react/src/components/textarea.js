import React from 'react';
import './SideNavBar.css';
import './BookCourt.css';
import DateTimeSelect from './DateTimeSelect';


function BookCourt() {

	return(
		<React.Fragment>
		<div className="jumbotron book-jumbo mb-0">
			<div id="blue-div">
				<h3>court hire</h3>
				<div className="date-time-div d-flex flex-column align-items-center">
					<h2 className="text-center">CHOOSE DATE AND TIME</h2>
					<div className="text-center">
						<DateTimeSelect/>
					</div>
				</div>
			</div>
			<div id="court-overlay" className="text-center mx-auto d-flex align-items-center justify-content-around">
				<div>
					<h3 className="white-text">OPENING HOURS</h3>
					<p className="white-text">Mon- Fri: <br/>10am - 10pm</p>
					<p className="white-text">Sat: <br/>9am - 10pm</p>
					<p className="white-text">Sun: <br/>8am - 10pm</p>
				</div>
			</div>
			<div id="jumbo-img" >
				
			</div>
		</div>

		

		</React.Fragment>
	);
}

export default BookCourt;






.book-jumbo {
	height: 100vh;
	width: 100%;
	margin-bottom: 0px;
	padding: 5vh;
	background-color: #fffffb;
	z-index: 4;
	position: relative;
}

#blue-div {
	background-color: #0f4b60;
	height: 100%;
	width: 60%;
	position: relative;

}

#blue-div h3 {
	writing-mode: vertical-rl;
	color: #fffffb;
	font-family: 'Saira Stencil One', cursive;
	position: absolute;
	bottom: 0;
	text-shadow: -1px -1px 1px #fff, 1px 1px 1px #000;
	position: relative;
}
#blue-div h3:hover {
	font-weight: bolder;
}

#court-overlay {
	background-image: linear-gradient(to bottom right, rgba(167, 31, 35, 0), rgba(167, 31, 35, 0.8));
	height: 50vh;
	width: 50%;
	position: absolute;
	top: 10vh;
	right: 5%;
	z-index: 5;

}
#jumbo-img {	
	background-image: url('../images/bookcourt.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	height: 50vh;
	width: 50%;
	position: absolute;
	top: 10vh;
	right: 5%;

}

#openinghrs {
	background-color: #2b2a2b;
	width: 50%;
	height: 60vh;
}

.date-time-div {
	height: 50vh;
	width: 80%;
	background-image: linear-gradient(to right, rgba(167, 31, 35, 0), rgba(167, 31, 35, 1));;
	position: absolute;
	left: 170px;
	top:250px;
	z-index: 6;
	padding: 100px 50px;
}






/*.left, .right {
  position: relative;
  height: 100px;
  width: 200px;
  background: #000;
  float: left;
}

.left:after {
  content: '';
  line-height: 0;
  font-size: 0;
  width: 0;
  height: 0;
  border-top: 100px solid #000;
  border-bottom: 50px solid transparent;
  border-left: 0px solid transparent;
  border-right: 50px solid transparent;
  position: absolute;
  top: 0;
  right: -50px;
}

.right {
  margin-left: 60px;
  width: 100px;
}

.right:before {
  content: '';
  line-height: 0;
  font-size: 0;
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 100px solid #000;
  border-left: 50px solid transparent;
  border-right: 0px solid #000;
  position: absolute;
  top: -50px;
  left: -50px;
}
*/




<div class="container-fluid container-contact p-5">
		  <div className="text-center">
		    <h2>Contact Us</h2>
		    <p>Swing by and sweat out, or leave us a message:</p>
		  </div>
		  <div class="row row-contact d-flex justify-content-around">
		    <div id="map-div" class="column-contact">
		      <iframe id="gmap" src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7312593565753!2d121.03125941397181!3d14.557354689830028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9b8d33b2c6d%3A0xb0c2f766338a92bd!2sZuitt+Makati!5e0!3m2!1sen!2sph!4v1562227985324!5m2!1sen!2sph"} allowfullscreen></iframe>
		    </div>
		    <div class="column-contact">
		      <form action="/action_page.php">
		        <label htmlFor="fname">First Name</label>
		        <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
		        <label htmlFor="lname">Last Name</label>
		        <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
		        <label htmlFor="email">Email</label>
		        <input type="email" id="email" name="email" placeholder="Your email.."/>
		        <label htmlFor="subject">Subject</label>
		        <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"170px"}}></textarea>
		       <Link to="/">
		        <input id="submit" type="submit" value="Submit"/>
		        </Link>
		      </form>
		    </div>
		  </div>
		</div>