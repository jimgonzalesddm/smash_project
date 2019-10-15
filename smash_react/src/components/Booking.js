import React, { useState } from 'react';
import UpdateBooking from './UpdateBooking.js';
import DateFnsUtils from "@date-io/date-fns"; 
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";

function Booking(props) {
	let currentUser = JSON.parse(localStorage.getItem("user"));
	console.log(props.booking)
	// const [selectedDate, handleDateChange] = useState(new Date());

	let [displayCalendar, setDisplayCalendar] = useState(false);

	// format date to year-month-day
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

	// To show calendar for rescheduling
	let displayUpdateCalendar = () => {
		if(displayCalendar === false) {
			return(
				<td onClick={rescheduleClickHandler}>
					{formatDate(props.booking.date)} 
					 ({props.booking.startTime}:00-{props.booking.endTime}:00)
				</td>
			);
		}
		else {
			return(
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<UpdateBooking selectedDate={props.selectedDate}
						    		handleDateChange={props.handleDateChange}
						    		setStartTime={props.setStartTime}
						    		setEndTime={props.setEndTime}
						    		startTime={props.startTime}
						    		endTime={props.endTime}
						    		updateClickHandler={updateClickHandler}
						    		booking={props.booking}
						    		timeSlot={props.timeSlot}
						    		setTimeSlot={props.setTimeSlot}
						    		setDisplayCalendar={setDisplayCalendar}/>

			    </MuiPickersUtilsProvider>
			);
		}
	}

	// Resched date
	let rescheduleClickHandler = () => {
		if(displayCalendar === false) {
			if(currentUser.admin === false && props.booking.status === "Confirmed") {
				setDisplayCalendar(false);
			}
			else {
				setDisplayCalendar(true);
			}
		}
	}

	let updateClickHandler = (newDate, newStartTime, newEndTime, timeSlot, totalHours, price) => {
		props.updateDate(props.booking, newDate, newStartTime, newEndTime, timeSlot, totalHours, price);
		setDisplayCalendar(false);
	}

	// let closeUpdateBookingBtn = () => {
	// 	setDisplayCalendar(false);
	// }


	let displayBooking = () => {
		if(currentUser === null || currentUser){
			if(currentUser === null) {
				return(
					<React.Fragment>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</React.Fragment>
				);
			}
			if(currentUser.admin === true) {
				return(
				<React.Fragment>
					<td>{props.booking.user.firstName} {props.booking.user.lastName}</td>
					<td>{props.booking.courtNum}</td>
						{displayUpdateCalendar()}
				
					<td>{props.booking.hours} hr/s</td>
					<td>Php {props.booking.price}</td>
					<td>{displayBtns()}</td>
				</React.Fragment>
				);
			}
			else {
				if(currentUser.id === props.booking.user.id) {
					return(
					<React.Fragment>
					<td>{props.booking.user.firstName} {props.booking.user.lastName}</td>
					<td>{props.booking.courtNum}</td>
						{displayUpdateCalendar()}
				
					<td>{props.booking.hours} hr/s</td>
					<td>Php {props.booking.price}</td>
					<td>{displayBtns()}</td>
				</React.Fragment>
				);
				}
			}
		}
	}

	
	let displayBtns = () => {
		if(currentUser.admin === false) {
			if(props.booking.status === "Pending") {
				return(
					<React.Fragment>
						
						<button onClick={deleteClickHandler}className="btn btn-dark"> Cancel </button>
					</React.Fragment>
				);	
			}
			else {
				return(
					<React.Fragment>
						<p>Reservation Confirmed</p>	
						
					</React.Fragment>
				);
			}
		}
		else {
			if(props.booking.status === "Pending") {
				return(
					<React.Fragment>
						<button onClick={confirmClickHandler}className="btn btn-dark"> Confirm </button>
						<button onClick={deleteClickHandler}className="btn btn-dark"> Cancel </button>
						<button onClick={deleteClickHandler}className="btn btn-dark"> Done </button>
					</React.Fragment>				
				);
			}
			else {
				return(
					<React.Fragment>
						<button disabled={true} className="btn btn-warning"> Confirmed </button>
						<button onClick={deleteClickHandler}className="btn btn-dark"> Cancel </button>
						<button onClick={deleteClickHandler}className="btn btn-dark"> Done </button>	
						
					</React.Fragment>
				);
			}
		}	
	}

	let confirmClickHandler = () => {
		props.updateStatus(props.booking, "Confirmed");
		alert("confirmed");
	}
	
	// Delete Btn
	let deleteClickHandler = () => {
		fetch("http://localhost:8080/bookings/"+props.booking.id, {
			method: 'delete',
			headers: {
				'Content-Type' : 'application/json',
				'x-auth-token': props.tokenUser
			}
		});

		props.deleteBooking(props.booking);
	}

	

	return(
		<React.Fragment>
			<tr class="table-info text-center">
				{displayBooking()}
			</tr>
			
		</React.Fragment>
	);
}

export default Booking;