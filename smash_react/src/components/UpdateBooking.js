import React, { useState, useEffect } from 'react';
import DateFnsUtils from "@date-io/date-fns"; 
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";

function UpdateBooking(props) {
	// let [startTime, setStartTime] = useState("");
	// let [endTime, setEndTime] = useState("");
	// let [disabledAmStart, setDisabledAmStart] = useState(false);
	// let [disabledPmStart, setDisabledPmStart] = useState(false);
	// let [disabledAmEnd, setDisabledAmEnd] = useState(false);
	// let [disabledPmEnd, setDisabledPmEnd] = useState(false);
	// let amStartTimeSlotsDisplay = () => 
	// 	amTimeSlots.map( time => <option value={time} disabled={disabledAmStart}>{time}</option>)
	// let pmStartTimeSlotsDisplay = () => 
	// 	pmTimeSlots.map( time => <option value={time} disabled={disabledPmStart}>{time}</option>)
	// let amEndTimeSlotsDisplay = () => 
	// 	amTimeSlots.map( time => <option value={time} disabled={disabledAmEnd}>{time}</option>)
	// let pmEndTimeSlotsDisplay = () => 
	// 	pmTimeSlots.map( time => <option value={time} disabled={disabledPmEnd}>{time}</option>)
	// let startAmTimeChangeHandler = (e) => {
	// 	props.setStartTime(e.target.value*1); 
	// 	// totalHoursCalculator(e.target.value*1);
	// 	if(e.target.value !== "") {
	// 		setDisabledPmStart(true);
	// 		// let updatedAmTime = amTimeSlots.filter( time => {
	// 		// 	return e.target.value !== time
	// 		// })
	// 		// setAmTimeSlots(updatedAmTime)
	// 	}
	// 	else {
	// 		setDisabledPmStart(false);
	// 	}
	// }

	// let startPmTimeChangeHandler = (e) => {
	// 	props.setStartTime(e.target.value*1);
	// 	// totalHoursCalculator(e.target.value*1);
	// 	if(e.target.value !== "") {
	// 		setDisabledAmStart(true);
	// 		setDisabledAmEnd(true);
	// 	}
	// 	else{
	// 		setDisabledAmStart(true);
	// 		setDisabledAmEnd(true);
	// 	}
	// }

	// let endAmTimeChangeHandler = (e) => {
	// 	props.setEndTime(e.target.value*1);
	// 	totalHoursCalculator(e.target.value*1);
	// 	if(e.target.value !== "") {
	// 		setDisabledPmEnd(true);
	// 	}
	// 	else {
	// 		setDisabledPmEnd(false);
	// 	}
	// }
	// let endPmTimeChangeHandler = (e) => {
	// 	props.setEndTime(e.target.value*1);
	// 	totalHoursCalculator(e.target.value*1);
	// 	if(e.target.value !== "") {
	// 		setDisabledAmEnd(true);
	// 	}
	// 	else {
	// 		setDisabledAmEnd(false)
	// 	}
	// }

	let startTimeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	let [endTimeSlots, setEndTimeSlots] = useState([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
	let [totalHours, setTotalHours] = useState("");
	let price = totalHours*200;
	let [disableUpdateBtn, setDisableUpdateBtn] = useState(false);
	let [selected, setSelected] = useState("");

	let [bookings, setBookings] = useState([]);

	useEffect( () => {
		fetch("http://localhost:8080/all-bookings")
		.then(res => res.json())
		.then(bookings => {
			setBookings(bookings)
			console.log(bookings)
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

	// get reserved slots 
	let reservedStartTimeSlots = []; 
	bookings.forEach( function(b) {
		if (b.courtNum === props.booking.courtNum && b.status === "Confirmed") {
			if(b.timeSlot) {
				let temp = {
					date: formatDate(b.date),
					times : [...b.timeSlot]
				} 
				console.log(temp)
				reservedStartTimeSlots.push(temp);	
			}			
		}
	})
	let reservedEndTimeSlots = []; 
	bookings.forEach( function(b) {
		if(b.courtNum === props.booking.courtNum && b.status === "Confirmed") {
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
	console.log(reservedStartTimeSlots)
	console.log(reservedEndTimeSlots)

	let startTimeSlotsDisplay = () => {
		console.log(reservedStartTimeSlots)

		let dateIndex = -1;
		for(let j=0; j<reservedStartTimeSlots.length; j++){
			if(reservedStartTimeSlots[j].date === formatDate(props.selectedDate)) {
				console.log(reservedStartTimeSlots[j].date, formatDate(props.selectedDate))
				dateIndex = j;
			}
		}

		let availTimeSlots = startTimeSlots;
		if(dateIndex != -1) {
			availTimeSlots = availTimeSlots.filter( t => {
				const i = reservedStartTimeSlots[dateIndex].times.indexOf(t);
				if(i === -1) return true;
				return false;
			}) 
		}
		console.log(availTimeSlots)
		return availTimeSlots.map( time => <option value={time}>{time}</option>)
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
		console.log(availTimeSlots)
		return availTimeSlots.map( time => <option value={time} >{time}</option>)
	}
	
	
	let startTimeChangeHandler = (e) => {
		props.setStartTime(e.target.value*1);
		
		totalHoursCalculator1(props.endTime, e.target.value*1);
		
		setNewEndTimeSlots(e.target.value*1)
		setSelected("selected");
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
			return (time < props.endTime)
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
				setDisableUpdateBtn(true);
			}
			else {
				setDisableUpdateBtn(false);
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
				setDisableUpdateBtn(true);
			}
			else {
				setDisableUpdateBtn(false);
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

	let closeClickHandler = () => {
		props.setDisplayCalendar(false);
	}


	return(
		<tr className="tableheader text-center bg-info">
			      	
	      	<td><DatePicker 
	      				value={props.selectedDate} 
	      				onChange={props.handleDateChange}
	      				disablePast = {true}
	     
	      				 /></td>
	      	<td> 
	      		<select onChange={startTimeChangeHandler}>
					<option></option>
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
			<td><button type="button" 
						onClick={function(e){
								props.updateClickHandler(props.selectedDate, 
															props.startTime, 
															props.endTime,
															props.timeSlot, 
															totalHours,
															price)}} 
						className="btn btn-dark" 
						disabled={disableUpdateBtn}>
				Update
				</button>
				<button type="button" 
						onClick={closeClickHandler} 
						className="btn btn-dark" 
						disabled={disableUpdateBtn}>
				Close
				</button>
			</td>
	     
		</tr>
	);
}

export default UpdateBooking;