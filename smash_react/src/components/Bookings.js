import React, { useState, useEffect } from 'react';
import Booking from './Booking';

function Bookings(props) {
	let [bookings, setBookings] = useState([]);
	let tokenUser = localStorage.getItem("token");


	useEffect( () => {
		fetch("http://localhost:8080/all-bookings")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setBookings(data);
		});
	}, []);


	// DELETE
	let deleteBooking = (booking) => {
		let updatedBooking = bookings.filter( function(b) {
			return (booking.id !== b.id)
		})
		setBookings(updatedBooking);
	}

	// UPDATE
	let updateDate = (booking, newDate, newStartTime, newEndTime, newTimeSlot, totalHours, price) => {
		console.log(bookings);
		let updatedDate = bookings.map( function(b) {
			if(booking.id===b.id && newDate !== b.date) {
				b.date = newDate;
				b.startTime = newStartTime;
				b.endTime = newEndTime;
				b.timeSlot = newTimeSlot;
				b.hours = totalHours;
				b.price = price;
				fetch("http://localhost:8080/bookings/"+booking.id+"/"+newDate+
							"/"+newStartTime+"/"+newEndTime+"/"+newTimeSlot+"/"+totalHours+"/"+price, {
					method: 'put',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': tokenUser
					}
				})
				.then(res => res.text())
				.then(data => {
					console.log(data)
				})
				return b;
			} else {
				return b;
			}
		});
		setBookings(updatedDate);

	}

	let updateStatus = (booking, status) => {
		let updateStatus = bookings.map( function(b) {
			if(booking.id===b.id && status !== b.status) {
				b.status = status;
				fetch("http://localhost:8080/bookings/"+booking.id+"/"+status, {
					method: 'put',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': tokenUser
					}
				})
				.then(res => res.text())
				.then(data => {
					console.log(data)
				})
				return b;
			} else {
				return b;
			}
		});
		setBookings(updateStatus);
	}

	let displayBookings = () => {
		if(bookings.length > 0) {
			return (
				bookings.map( booking =>
					<Booking key={booking.id}
							booking={booking}
							deleteBooking={deleteBooking}
							tokenUser={tokenUser}
							updateDate={updateDate}
							updateStatus={updateStatus}
							selectedDate={props.selectedDate}
			    				handleDateChange={props.handleDateChange}
			    				setStartTime={props.setStartTime}
			    				setEndTime={props.setEndTime}
			    				startTime={props.startTime}
			    				endTime={props.endTime}
			    				status={props.status}
						    	setStatus={props.setStatus}
						    	timeSlot={props.timeSlot}
						    	setTimeSlot={props.setTimeSlot}
			    				
					/>
				)
			);
		}
		else {
			return(
				<tr class="table-info text-center">
				<td><h7 className="text-center ">You have no bookings to display yet.</h7></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				</tr>    			   
			);
		}
	}

	return(
		
		<table class="table table-striped w-auto text-center">

		 	 <thead className="bg-white">
		    	<tr>
			      	<th>NAME</th>
			      	<th>COURT#</th>
			      	<th>DATE & TIME</th>
			      	<th>HOURS</th>
			      	<th>TOTAL</th>
			      	<th></th>
		    	</tr>
		 	 </thead>

		  	<tbody>
		  		{displayBookings()}
			    
			</tbody>

		</table>
		
	);
}

export default Bookings;