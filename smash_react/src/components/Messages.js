import React, { useState, useEffect } from 'react';
import './Messages.css';
import Message from './Message.js';

function Messages() {
	let [messages, setMessages] = useState([]);
	let tokenUser = localStorage.getItem("token");

	useEffect( () => {
		fetch("http://localhost:8080/all-messages")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setMessages(data);
		});
	}, []);

	let displayMessages = () => {
		if(messages.length > 0) {
			return(
				messages.map( message => 
					<Message key={message.id}
							message={message}
							tokenUser={tokenUser}
							deleteMessage={deleteMessage}/>
				)

			);
		}
		else {
			return(
				<tr>
			      	<td>You have no messages available.</td>  	 	
			      	<td></td>  	 	
			      	<td></td>  	 	
		    	</tr>
			);
		}
	}

	let deleteMessage = (message) => {
		let updatedMessages = messages.filter( function(m) {
			return (message.id !== m.id)
		})
		setMessages(updatedMessages);
	}

	return(
		<div className="jumbotron jumbo-msgs mb-0 text-center">
			<div className="img-div">
				<img id="mail-img" src={require('../images/halfmail.png')} alt="..."/>
				<h3>messages</h3>
			</div>
			<div id="msg-table">
				<table className="table table-striped table-responsive text-center fixed_header">
				 	<thead className="bg-white">
				    	<tr>
					      	<th>Sender</th>
					      	<th>Email</th>
					      	<th>Message</th>  	 	
				    	</tr>
				 	 </thead>
				  	<tbody>
				  		{displayMessages()} 
					</tbody>
				</table>	
			</div>
		</div>

	);
}

export default Messages;