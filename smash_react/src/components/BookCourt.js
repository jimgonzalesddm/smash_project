import React, { useState, useEffect } from 'react';
import './SideNavBar.css';
import './BookCourt.css';
import CourtRow from './CourtRow.js';
import Bookings from './Bookings.js';

import DateFnsUtils from "@date-io/date-fns"; 
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";

function BookCourt() {
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user") ? true : false)
	let existingUser = JSON.parse(localStorage.getItem("user"));
	let tokenUser = localStorage.getItem("token");
	const [selectedDate, handleDateChange] = useState(new Date());
	console.log(existingUser)

	let [startTime, setStartTime] = useState("");
	let [endTime, setEndTime] = useState("");
	let [status, setStatus] = useState("Pending")
	let [timeSlot, setTimeSlot] = useState([]);

	let [bookings, setBookings] = useState([]);
	useEffect( () => {
		fetch("http://localhost:8080/all-bookings")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setBookings(data);
		});
	}, []);

	console.log(timeSlot)

	// let [day,setDay] = useState([
	// 	{
	// 		date: selectedDate,
	// 		timeSlot: 
	// 	}
	// 	]) 
	// }

	// let [takenTimes, setTakenTimes] = useState([]);
	// let listTakenStartTimes = 
	// 	bookings.map( function(booking) {
	// 		console.log(booking.startTime)
	// 		return booking.startTime*1;
	// 	})
	
	// let listTakenEndTimes = 
	// 	bookings.map( function(booking) {
	// 		return booking.endTime;
	// 	})
	

	// let disableStartTimes = (time) =>{
	// 	return listTakenStartTimes.indexOf(time)>-1 ? true :false
	// }
	// console.log(listTakenStartTimes)
	
	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2)
	        month = '0' + month;
	    if (day.length < 2)
	        day = '0' + day;

	    return [year, month, day].join('-');
	}

	let checkoutClickHandler = (value, totalHours, price) => {
		if(isLoggedIn) {
			if(startTime !== "" && endTime !== "") {
				let newBooking = {
					courtNum: value,
					date: selectedDate,
					startTime: startTime,
					endTime: endTime,
					timeSlot: timeSlot,
					hours: totalHours,
					price: price,
					status: status
				}
				fetch("http://localhost:8080/users/"+existingUser.id+"/bookings", {
					method: 'post',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': tokenUser
					},
					body: JSON.stringify(newBooking)
				})
				.then(res => res.text())
				.then(booking => {
					console.log(booking)
					setBookings([...bookings, JSON.parse(booking)])
					setStartTime("")
					setEndTime("")
					window.location.reload();
				});	
				alert("reserved");

			}
			else {
				alert("You need to select date and time");
			}
		}
		else{
			alert("Please sign in.")
		}
	}

	let displayFullPage = () => {
		return(
			<React.Fragment>
				<div className="jumbotron book-jumbo mb-0">

					<div id="court-overlay" className="text-center mx-auto d-flex align-items-center justify-content-around">
						<div className="openinghrs p-5">
							<h1 className="white-text">OPENING HOURS</h1>
							<p className="white-text">Monday- Sunday: </p>
							<p className="white-text">8am - 10pm</p>
							<p className="white-text">Php 200/hr</p>
						</div>
					</div>
					<div id="jumbo-img">
						
					</div>
				</div>
				<div className="jumbotron book-jumbo-second mb-0">
					<div id="blue-div">
						<h3>court hire</h3>
					</div>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<table class="table table-striped table-responsive booking-table">
					  <thead>
					    <tr className="tableheader text-center">
					      <th scope="col">Court #</th>
					      <th scope="col">Date</th>
					      <th scope="col">Start Time</th>
					      <th scope="col">End Time</th>
					      <th scope="col">Number of Hours</th>
					     <th scope="col">Price</th>	
					     <th scope="col"></th>	
					    </tr>
					  </thead>
					  <tbody>
					    	<CourtRow selectedDate={selectedDate}
					    				handleDateChange={handleDateChange}
					    				setStartTime={setStartTime}
					    				setEndTime={setEndTime}
					    				startTime={startTime}
					    				endTime={endTime}
					    				setTimeSlot={setTimeSlot}
					    				checkoutClickHandler={checkoutClickHandler}
					    				value={1}
					    	/>
					    	<CourtRow selectedDate={selectedDate}
					    				handleDateChange={handleDateChange}
					    				setStartTime={setStartTime}
					    				setEndTime={setEndTime}
					    				startTime={startTime}
					    				endTime={endTime}
					    				setTimeSlot={setTimeSlot}
					    				checkoutClickHandler={checkoutClickHandler}
					    				value={2}
					    	/>
					    	<CourtRow selectedDate={selectedDate}
					    				handleDateChange={handleDateChange}
					    				setStartTime={setStartTime}
					    				setEndTime={setEndTime}
					    				startTime={startTime}
					    				endTime={endTime}
					    				setTimeSlot={setTimeSlot}
					    				checkoutClickHandler={checkoutClickHandler}
					    				value={3}
					    	/>
					    
					  </tbody>
					</table>
					</MuiPickersUtilsProvider>

				</div>
				<div className="jumbotron book-jumbo-third mb-0">
					<div className="reservation-table table-responsive">
						<Bookings selectedDate={selectedDate}
						    		handleDateChange={handleDateChange}
						    		setStartTime={setStartTime}
						    		setEndTime={setEndTime}
						    		startTime={startTime}
						    		endTime={endTime}
						    		timeSlot={timeSlot}
						    		setTimeSlot={setTimeSlot}

						    		
						/>
					</div>
					<h3>reseravations</h3>
				</div>
			</React.Fragment>
			);
	}

	let display = () => {
		console.log(existingUser)
		if(existingUser === null || existingUser) {
			if(existingUser === null) {
				return(
					<React.Fragment>
					{displayFullPage()}
					</React.Fragment>
				);
			}
			else if(existingUser.admin === false) {
				return(
					<React.Fragment>
					{displayFullPage()}
					</React.Fragment>
				);
			}
			else {
				return(
					<div className="jumbotron book-jumbo-third mb-0 d-flex justify-content-center">
						<div className="reservation-table">
							<Bookings selectedDate={selectedDate}
							    		handleDateChange={handleDateChange}
							    		setStartTime={setStartTime}
							    		setEndTime={setEndTime}
							    		startTime={startTime}
							    		endTime={endTime}
							    		status={status}
							    		setStatus={setStatus}
							    		timeSlot={timeSlot}
							    		setTimeSlot={setTimeSlot}						    		
							/>
						</div>
						<h3>reservations</h3>
					</div>
				);
			}
		}
	}
	

	return(
		<React.Fragment>
			{display()}

		</React.Fragment>
	);
}

export default BookCourt;





