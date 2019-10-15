import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
	let [firstname, setFirstname] = useState("");
	let [lastname, setLastname] = useState("");
	let [email, setEmail] = useState("");
	let [content, setContent] = useState("");

	// alerts
	let [firstnameAlert, setFirstnameAlert] = useState("");
	let [lastnameAlert, setLastnameAlert] = useState("");
	let [emailAlert, setEmailAlert] = useState("");
	let [contentAlert, setContentAlert] = useState("");
	let [disabledBtn, setDisabledBtn] = useState(true);

	let firstnameOnChangeHandler = (e) => {
		setFirstname(e.target.value);
		if(e.target.value === "") {
			setFirstnameAlert("First name is required.");
		} else {
			setFirstnameAlert("");
		}
		console.log(firstname)
	}
	let lastnameOnChangeHandler = (e) => {
		setLastname(e.target.value);
		if(e.target.value === "") {
			setLastnameAlert("Last name is required.");
		} else {
			setLastnameAlert("");
		}
	}
	let emailOnChangeHandler = (e) => {
		setEmail(e.target.value);
		if(e.target.value === "") {
			setEmailAlert("Email is required.");
		}  
		else {
			setEmailAlert("");	
		}
	}
	let contentOnChangeHandler = (e) => {
		setContent(e.target.value);
		if(e.target.value === "") {
			setContentAlert("Please type a message.");
		}  
		else {
			setContentAlert("");
			
		}
	}

	let validate = () => {
		if(firstnameAlert === "" && lastnameAlert === "" &&
			emailAlert === "" && firstname !== "" && lastname !== "" &&
			email !== "" && content !== "") {
			if(disabledBtn) {
				setDisabledBtn(false);
			}
		}
		else {
			if(!disabledBtn)
			setDisabledBtn(true);	
		}
	}

	validate();
	
	let sendClickHandler = () => {
		let newMessage = {
					name: firstname+" "+lastname,
					email: email,
					content: content
				}
				fetch("http://localhost:8080/add/messages", {
					method: 'post',
					headers: {
						'Content-Type' : 'application/json'
					},
					body: JSON.stringify(newMessage)
				})
				.then(res => res.json())
				.then(message => {
					console.log(message)
				});	
				alert("message sent!");
				setFirstname("");
				setLastname("");
				setEmail("");
				setContent("");
				// window.location.reload();
	}


		
	return(

		<div className="jumbotron jumbotron-contact mb-0">
			<div id="contact-image"></div>
			<h1 className="">Contact Us</h1>
			<div id="contact-form" className="col-12 col-md-4 offset-4">
				<div className="column-contactform-group">
					
		        		<button onClick={sendClickHandler} 
		        				id="submit" 
		        				type="button" 
		        				disabled={disabledBtn}>
		        				SEND
		        		</button>
		        	
		      	<form action="/action_page.php">
		        	<input onChange={firstnameOnChangeHandler} 
		        			value={firstname} 
		        			type="text" 
		        			id="contact-fname" 
		        			name="firstname"
		        			className="form-control" 
		        			placeholder="Your first name.."/>
		 			<div><small className="text-danger">{firstnameAlert}</small></div>
		        	<input onChange={lastnameOnChangeHandler} 
		        			value={lastname} 
		        			type="text" 
		        			id="contact-lname" 
		        			name="lastname"
		        			className="form-control"  
		        			placeholder="Your last name.."/>
		      		<div><small className="text-danger">{lastnameAlert}</small></div>
		        	<input onChange={emailOnChangeHandler} 
		        			value={email} 
		        			type="email" 
		        			id="contact-email" 
		        			name="email"
		        			className="form-control"  
		        			placeholder="Your email.."/>
					<div><small className="text-danger">{emailAlert}</small></div>
		        	<textarea onChange={contentOnChangeHandler} 
		        				value={content} 
		        				id="contact-subject" 
		        				name="subject" 
		        				className="form-control" 
		        				placeholder="Write something.." 
		        				style={{height:"170px"}}>
		        	</textarea>
		       		<div><small className="text-danger">{contentAlert}</small></div>
		      	</form>
		    </div>
			</div>
		</div>

		
	);
}

export default Contact;