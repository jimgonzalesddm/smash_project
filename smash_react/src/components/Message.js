import React, { useState, useEffect } from 'react';
import './Messages.css';

function Message(props) {
	let [displayMsg, setDisplayMsg] = useState(false);
	// let [displayMailIcon, setDisplayMailIcon] = useState(true);
	
	let mailIconClickHandler = () => {
		setDisplayMsg(true);
	}

	let trashIconClickHandler = () => {
		fetch("http://localhost:8080/messages/"+props.message.id, {
			method: 'delete',
			headers: {
				'Content-Type' : 'application/json',
				'x-auth-token': props.tokenUser
			}
		});
		alert("message deleted");
		props.deleteMessage(props.message);
	}

	let backClickHandler = () => {
		setDisplayMsg(false);
	}

	// let showEnvIcon = () => {
	// 	if(displayMailIcon) {
	// 		return(
	// 			<i onClick={mailIconClickHandler} 
	// 				className="fa fa-envelope mail-icon" 
	// 				aria-hidden="true">
	// 			</i>
	// 		);
	// 	}
	// 	else if(displayMailIcon === false) {
	// 		return(
	// 			<i onClick={mailIconClickHandler} 
	// 				classNmae="fa fa-envelope mail-icon" 
	// 				aria-hidden="true">
	// 			</i>
	// 		);
	// 	}
	// }

	let showMsg = () => {
		if(displayMsg === false) {
			return(
				<tr>
					<td>{props.message.name}</td>
					<td>{props.message.email}</td>
					<td>
						<i onClick={mailIconClickHandler} 
							className="fa fa-envelope fa-2x mail-icon" 
							aria-hidden="true">
						</i>
						<i onClick={trashIconClickHandler} 
							className="fa fa-trash fa-2x ml-4 trash-icon" 
							aria-hidden="true"></i>
					</td>
				</tr>
			);
		}
		else {
			return(
				<tr>
					<td>{props.message.name}</td>
					<td>{props.message.email}</td>
					<td><div id="td-msg-content">{props.message.content}</div>
					<p onClick={backClickHandler} className="back">back</p>
					</td>
				</tr>
			);
		}
	}

	return(
		<React.Fragment>
			{showMsg()}


		</React.Fragment>
	);
}

export default Message;