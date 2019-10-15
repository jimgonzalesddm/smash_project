import React, { useState, useEffect } from 'react';
import './CourtRow.css';
import DateFnsUtils from "@date-io/date-fns"; 
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";

function CourtRow(props) {
	let startTimeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	let [endTimeSlots, setEndTimeSlots] = useState([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);

	let [selectedDate, setSelectedDate] = useState(new Date());
	let [totalHours, setTotalHours] = useState("");
	let price = totalHours*200;

	let [disabledTime, setDisabledTime] = useState(false);
	// let [disableDays, setDisableDays] = useState(false);
	let [disableReserveBtn, setDisableReserveBtn] = useState(false);
	let [bookings, setBookings] = useState([]);

	let [selected, setSelected] = useState("");

	useEffect( () => {
		fetch("http://localhost:8080/all-bookings")
		.then(res => res.json())
		.then(bookings => {
			setBookings(bookings)
		});
	}, []);

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


	//  let listDates = bawalnaDates.map(function(appointment){
	//    return formatDate(appointment.date)
	//  })


	 
	function disableDays() {
	 	if(startTimeSlots === [] && endTimeSlots === []) {
	 		return true;
	 	}
	}

	// get reserved slots 
	let reservedStartTimeSlots = []; 
	bookings.forEach( function(b) {
		if (b.courtNum === props.value && b.status === "Confirmed") {
			if(b.timeSlot) {
				let temp = {
					date: formatDate(b.date),
					times : [...b.timeSlot]
				} 
				reservedStartTimeSlots.push(temp);	
			}			
		}
	})
	let reservedEndTimeSlots = []; 
	bookings.forEach( function(b) {
		if(b.courtNum === props.value && b.status === "Confirmed") {
			if(b.timeSlot) {
				let unmodifiedReservedEndTimeSlots = [...b.timeSlot];
				// remove first time slot
				unmodifiedReservedEndTimeSlots.shift(); 
				// add last time slot with +1 value
				unmodifiedReservedEndTimeSlots
				.push(unmodifiedReservedEndTimeSlots
					[unmodifiedReservedEndTimeSlots.length - 1]+ 1)

				let temp = {
					date: formatDate(b.date),
					times : unmodifiedReservedEndTimeSlots
				}
				reservedEndTimeSlots.push(temp);
			} 
		}
		
	})
	console.log(reservedStartTimeSlots);

	let startTimeSlotsDisplay = () => {
		console.log(reservedStartTimeSlots)

		// checkReservedStartTimeSlots();
		let dateIndex = -1;
		for(let j=0; j<reservedStartTimeSlots.length; j++){
			if(reservedStartTimeSlots[j].date === formatDate(props.selectedDate)) {
				console.log(reservedStartTimeSlots[j].date, formatDate(props.selectedDate))
				dateIndex = j;
			}
		}
		console.log(dateIndex);

		let availTimeSlots = startTimeSlots;
		if(dateIndex != -1) {
			availTimeSlots = availTimeSlots.filter( t => {
				const i = reservedStartTimeSlots[dateIndex].times.indexOf(t);
				if(i === -1) return true;
				return false;
			}) 
		}

		console.log(availTimeSlots)
		return availTimeSlots.map( time => <option value={time} disabled={disabledTime}>{time}</option>)
	}

	let endTimeSlotsDisplay = () => {
		console.log(reservedEndTimeSlots)

		let dateIndex = -1;
		for(let j=0; j<reservedEndTimeSlots.length; j++){
			if(reservedEndTimeSlots[j].date === formatDate(props.selectedDate)) {
				console.log(reservedEndTimeSlots[j].date, formatDate(props.selectedDate))
				dateIndex = j;
			}
		}

		let availTimeSlots = endTimeSlots;
		if(dateIndex != -1) {
			availTimeSlots = availTimeSlots.filter( t => {
				const i = reservedEndTimeSlots[dateIndex].times.indexOf(t);
				if(i === -1) return true;
				return false;
			})
		}
		console.log(props.startTime)
		return availTimeSlots.map( time => <option value={time} disabled={disabledTime}>{time}</option>)
	}

	let startTimeChangeHandler = (e) => {
		props.setStartTime(e.target.value*1);
		
		totalHoursCalculator1(props.endTime, e.target.value*1);
		
		setNewEndTimeSlots(e.target.value*1)
		setSelected("selected");
		console.log(reservedStartTimeSlots);
	}

	let setNewEndTimeSlots = (newStartTime) => {
		endTimeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
		let newEndTimeSlots = endTimeSlots.filter( function(time) {
			return (time > newStartTime);
		})
		console.log(newEndTimeSlots)
		setEndTimeSlots(newEndTimeSlots);
		// props.setEndTime(newStartTime+1)
		let takenTime = startTimeSlots.filter( function(time) {
			return (time < props.endTime && time > newStartTime)
		})
		// takenTime.unshift(newStartTime);
		props.setTimeSlot(takenTime);
		checkStartMatchTimes(takenTime)
		console.log(takenTime)
		console.log(reservedStartTimeSlots)
	}

	let endTimeChangeHandler = (e) => {
		props.setEndTime(e.target.value*1);
		totalHoursCalculator1(e.target.value*1, props.startTime);
		setTakenTime(e.target.value)
	}

	let setTakenTime = (t) => {
		let takenTime = endTimeSlots.filter( function(time) {
			return (time < t)
		})
		takenTime.unshift(props.startTime*1);
		props.setTimeSlot(takenTime);
		checkMatchTimes(takenTime)
		console.log(takenTime)
	}

	let checkStartMatchTimes = (takenTime) => {
		let dateIndex = -1;
		for(let j=0; j<reservedStartTimeSlots.length; j++){
			if(reservedStartTimeSlots[j].date === formatDate(props.selectedDate)) {
				console.log(reservedStartTimeSlots[j].date, formatDate(props.selectedDate))
				dateIndex = j;
			}
		}
		if(dateIndex != -1) {
			// compare reserved timeslots from newley selected timeslots
			const intersection = reservedStartTimeSlots[dateIndex].times.filter(time => takenTime.includes(time));
			// intersection = array of same elements present on the two arrays compared
			console.log(takenTime)
			console.log(intersection)
			if(intersection.length > 0) {
				alert("some time slots you chose are already taken");
				setDisableReserveBtn(true);
			}
			else {
				setDisableReserveBtn(false);
			}
		}
	}
	let checkMatchTimes = (takenTime) => {
		let dateIndex = -1;
		for(let j=0; j<reservedEndTimeSlots.length; j++){
			if(reservedEndTimeSlots[j].date === formatDate(props.selectedDate)) {
				console.log(reservedEndTimeSlots[j].date, formatDate(props.selectedDate))
				dateIndex = j;
			}
		}
		if(dateIndex != -1) {
			// compare reserved timeslots from newley selected timeslots
			const intersection = reservedStartTimeSlots[dateIndex].times.filter(time => takenTime.includes(time));
			// intersection = array of same elements present on the two arrays compared
			console.log(intersection)
			if(intersection.length > 0) {
				alert("some time slots you chose are already taken");
				setDisableReserveBtn(true);
			}
			else {
				setDisableReserveBtn(false);
			}
		}
	}

	let totalHoursCalculator1 = (endTime, startTime) => {
		if(startTime < endTime){
			let total = (endTime - startTime)
			setTotalHours(total);	
		}
		else {	
		}
	}	

	return(
		<tr className="tableheader text-center">
	      	<th id="court1"scope="row">Court {props.value}</th>
	      	<td><DatePicker 
	      				value={props.selectedDate} 
	      				onChange={props.handleDateChange}
	      				disablePast = {true}
	     				shouldDisableDate={disableDays}
	      				 /></td>
	     				
	     				
	      	<td> 
	      		<select onChange={startTimeChangeHandler}>
					<option ></option>
					{startTimeSlotsDisplay()} 
						
				</select> :00		
			</td> 
			<td> 
				<select onChange={endTimeChangeHandler}>
					<option selected={selected}></option>
					{endTimeSlotsDisplay()} 
						
				</select> :00		
			</td>
			<td>{totalHours}</td>
			<td>{price}</td>
			<td><button onClick={function(e){
											props.checkoutClickHandler(e.target.value, 
																		totalHours, 
																		price)}} 
						className="btn btn-dark"
						id="reserveBtn" 
						value={props.value} 
						disabled={disableReserveBtn}>Reserve</button></td>
	     
	    </tr>
	);
}

export default CourtRow;