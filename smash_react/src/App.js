import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import './components/SideNavBar.css';
import './components/Login.css';
import Smash from './components/Smash.js';
import BookCourt from './components/BookCourt.js';
import Profile from './components/Profile.js';
import Contact from './components/Contact.js';
import Bookings from './components/Bookings.js';
import Messages from './components/Messages.js';



function App() {
	// localStorage.removeItem("user")
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user") ? true : false)
	let existingUser = JSON.parse(localStorage.getItem("user"));
	
	let [users, setUsers] = useState([]);

	// LOGIN.......

	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");

	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)
	}

	function parseJwt (token) {
	    var base64Url = token.split('.')[1];
	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));

	    return JSON.parse(jsonPayload);
	};
	let signinClickHandler = () => {
		let user = {
			username,
			password
		}
		fetch("http://localhost:8080/login", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => res.text())
		.then(data => {
			console.log(data)
			console.log(parseJwt(data).user);
			localStorage.setItem("token", data)
			localStorage.setItem("user", JSON.stringify(parseJwt(data).user));
			setIsLoggedIn(true);
			window.location.reload();
			console.log(parseJwt(data).user.admin)
		})
		.catch(e => {
			alert("Login failed")
			console.log(e)
		});
		
		return (
			<div>
			Hello User
			</div>
		);
	}

	// REGISTER.......

	useEffect( () => {
		fetch("http://localhost:8080/")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setUsers(data);
		});
	}, []);
	console.log(users);
	let [firstname, setFirstname] = useState("");
	let [lastname, setLastname] = useState("");
	let [email, setEmail] = useState("");
	let [usernameReg, setUsernameReg] = useState("");
	let [passwordReg, setPasswordReg] = useState("");
	let [confirmpw, setConfrimpw] = useState("");
	let [firstnameAlert, setFirstnameAlert] = useState("");
	let [lastnameAlert, setLastnameAlert] = useState("");
	let [emailAlert, setEmailAlert] = useState("");
	let [usernameRegAlert, setUsernameRegAlert] = useState("");
	let [passwordRegAlert, setPasswordRegAlert] = useState("");
	let [confirmpwAlert, setConfirmpwAlert] = useState("");

	let [disabledBtn, setDisabledBtn] = useState(true);
	let [staffpw, setStaffpw] = useState("");
	let [isAdmin, setIsAdmin] = useState(true);
	let [staffpwAlert, setStaffpwAlert] = useState("");

	let roles = ["Staff", "Guest"];


	function firstnameOnChangeHandler(e) {
		setFirstname(e.target.value.trim());
		if(e.target.value === "") {
			setFirstnameAlert("First name is required.");
		} else {
			setFirstnameAlert("");
		}
	}

	function lastnameOnChangeHandler(e) {
		setLastname(e.target.value.trim());
		if(e.target.value === "") {
			setLastnameAlert("Last name is required.");
		} else {
			setLastnameAlert("");
		}
	}

	function emailOnChangeHandler(e) {
		setEmail(e.target.value.trim());
		if(e.target.value === "") {
			setEmailAlert("Email is required.");
		}  
		else {
			setEmailAlert("");
			
		}
	}

	function usernameRegOnChangeHandler(e) {
		setUsernameReg(e.target.value.trim());
		 if(e.target.value === "") {
			setUsernameRegAlert("Username is required.")
		} 
		else if(e.target.value) {
			let errorFlag = undefined;
			users.forEach( function(user) {
				if(e.target.value === user.username) {
					console.log(user.username)
					errorFlag = true;
				}
			});
			if(errorFlag) {
				setUsernameRegAlert("Username is already taken");
			}
			else {
				setUsernameRegAlert("");
				
			}
			return usernameRegAlert;
		}
	}

	function passwordRegOnChangeHandler(e) {
		setPasswordReg(e.target.value.trim());
		if(e.target.value === ""){
			setPasswordRegAlert("Password is required.");				
		}
		else{
			if(e.target.value !== confirmpw) {
				setConfirmpwAlert("Passwords do not match.");	
			}
			else{
				setPasswordRegAlert("");
				setConfirmpwAlert("");
			}
		} 
	}

	function confirmpwOnChangeHandler(e) {
		setConfrimpw(e.target.value.trim());
		if(e.target.value === ""){
			setConfirmpwAlert("Password is required.");				
		}
		else{
			if(e.target.value !== passwordReg) {
				setPasswordRegAlert("Passwords do not match.");	
			}
			else{
				setPasswordRegAlert("");
				setConfirmpwAlert("");
			}
		} 
	}

	function staffpwOnChangeHandler(e) {
		setStaffpw(e.target.value.trim());
		if(isAdmin) {
			if(e.target.value === "") {
				setStaffpwAlert("Staff password is required.");
			}  
			else {
			}
		}
		else {
			setStaffpwAlert("");
		}
	}

	// ROLE
	
	let displayRoleOptions = () => 
		roles.map( role => <option >{role}</option>)

	let roleChangeHandler = (e) => {
		console.log(e.target.value)
		if(e.target.value === "Guest") {
			setIsAdmin(false);
		}
		else {
			setIsAdmin(true);
		}
		
	}

	function register() {

		if(firstnameAlert === "" && lastnameAlert === "" &&
			emailAlert === "" && usernameRegAlert === "" && passwordRegAlert === "" && confirmpwAlert === "" &&
			firstname !== "" && lastname !== "" &&
			email !== "" && usernameReg !== "" && passwordReg !== "" && confirmpw !== "" 
			&& isAdmin === false && staffpw === ""
			) {
			if(disabledBtn) {
				setDisabledBtn(false);
			}

		}
		else if(firstnameAlert === "" && lastnameAlert === "" &&
			emailAlert === "" && usernameRegAlert === "" && passwordRegAlert === "" && confirmpwAlert === "" &&
			firstname !== "" && lastname !== "" &&
			email !== "" && usernameReg !== "" && passwordReg !== "" && confirmpw !== "" 
			&& isAdmin === true && staffpw === "1234509876"
			) {
			if(disabledBtn) {
				setDisabledBtn(false);
			}
		}
		else {
			if(!disabledBtn) setDisabledBtn(true);
		}

	}

	register();

	function registerClickHandler() {
		let newUser = {
			firstName: firstname,
			lastName: lastname,
			email: email,
			image: "user.png",
			username: usernameReg,
			password: passwordReg	
		}
		// implement front end validation here
		fetch("http://localhost:8080/register/"+isAdmin, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})
		.then(res => res.text())
		.then(data => {
			console.log(JSON.stringify(parseJwt(data)))
			localStorage.setItem("token", data);
			localStorage.setItem("user", JSON.stringify(parseJwt(data).user));
			alert("Welcome to Smash Community!");
			setIsLoggedIn(true);
			window.location.reload();
		});
		
	}

	// LOGOUT ......

	let logoutClickHandler = () => {
	    localStorage.removeItem("user");
	    setIsLoggedIn(false);

  	}
			 
	let displayNav = () => {
		if(isLoggedIn === false) {
			return(
				<React.Fragment>
				<nav  className="sidenav mySidenav">
				  <Link to="/" id="home" className="nav-link active">HOME</Link>
				  <Link to="/book-court" className="nav-link bookings">BOOK <span>COURT</span></Link>

				  <Link to="/contact" className="nav-link" id="contact-us-notUser">CONTACT <span>US</span></Link>
				  

			
				  <Link to="/login" 
				  		id="login"
				  		className="nav-link"
				  		data-toggle="modal" 
				  		data-target="#modalLRForm">
				  		LOGIN
				  </Link>
				</nav> 
				<Route path="(|/|)" exact component={Smash}/>
			   
			    </React.Fragment> 
			);
		}
		else {
			if(existingUser.admin === false) {
				return(
					<React.Fragment>
						<nav className="sidenav mySidenav">

							<Link to="/profile" id="profile" className="nav-link">PROFILE</Link>
						  						  
							<Link to="/book-court" className="nav-link bookings text-center">BOOK <span>COURT</span></Link>
						

						  	<Link to="/" 
						  		id="logout-guest"
						  		className="nav-link text-center"
						  		onClick={logoutClickHandler}
						  		>
						  		LOGOUT
						  	</Link>
						</nav> 
						
						<Route path="/profile" exact component={Profile}/>

					</React.Fragment>
				);
			}
			 else if(existingUser.admin === true){
			 	return(
				 	<React.Fragment>
						<nav className="sidenav mySidenav">

						  <Link to="/profile" id="profile" className="nav-link">PROFILE</Link>
						  
						  <Link to="/book-court" className="nav-link bookings">BOOKINGS</Link>

						  <Link to="/messages" className="nav-link messages">MESSAGES</Link>

						  <Link to="/" 
						  		id="logout-admin"
						  		className="nav-link text-center"
						  		onClick={logoutClickHandler}
						  		>
						  		LOGOUT
						  </Link>
						</nav> 
						
						<Route path="/profile" exact component={Profile}/>
						<Route path="/messages" exact component={Messages}/>

					</React.Fragment>
			 	);

			}
		}
	}

	let displayContent = () => {
		if(isLoggedIn === false) {
			return(
				<React.Fragment>
				{displayNav()}
	     

	    <div className="modal fade" id="modalLRForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  	<div className="modal-dialog cascading-modal" role="document">
			    
			    	<div className="modal-content card-image">
			      		<div className="modal-c-tabs">

					        <ul id="nav-ul" className="nav nav-tabs md-tabs tabs-2" role="tablist">
					        	<li className="nav-item">
					            	<span className="nav-link active brown-text" 
					            			data-toggle="tab" 
					            			href="#panel7" 
					            			role="tab"><i className="fa fa-user logregicon mr-2" aria-hidden="true"></i>
					              			Login</span>
					        	</li>
					        	<li className="nav-item">
					            	<span className="nav-link brown-text" 
					            			data-toggle="tab" 
					            			href="#panel8" 
					            			role="tab"><i className="fa fa-user-plus logregicon mr-2" aria-hidden="true"></i>
					              		Register</span>
					          	</li>
					        </ul>
        
					        <div className="tab-content">
					          
					          	<div className="tab-pane fade in show active" id="panel7" role="tabpanel">

						            <div className="modal-body mb-1">

						              	<div className="md-form form-sm mb-5">	

						                	<input 	placeholder="Your username"
						                			className="form-control form-control-sm validate"
													onChange={usernameChangeHandler}
													type="text" 
													id="usernameLogin" 
													autoComplete="off"
													value={username}
						                	/>
						              	</div>

						              	<div className="md-form form-sm mb-4">			                
						                	<input 	placeholder="Your password"
						                			className="form-control form-control-sm validate"
													onChange={passwordChangeHandler}
													type="password" 
													id="passwordLogin" 
													autoComplete="off"
													value={password}
						                	/>
						              	</div>

						              	<div className="text-center mt-2 brown-text">
						           
						                	<Link 	to="/profile"
													type="button" 
													id="signinBtn"
													onClick={signinClickHandler}
													className="btn btn-warning brown-text"
											> 
											SIGN IN
											
											</Link>
						              	</div>
						      	    </div>
					            
						            <div className="modal-footer">
						              	<div className="options text-center text-md-right mt-1">
						                	<p>Not a member? <a href="#panel8" 
						                						className="brown-text" 
						                						data-toggle="tab"
						                						role="tab">Sign Up</a></p>
						                	<p>Forgot <a href="#" className="brown-text">Password?</a></p>
						              	</div>
						              	<button id="closeBtn-login"
						              			type="button" 
						              			className="btn ml-auto white-text" 
						              			data-dismiss="modal">
						              		Close
						              	</button>
						            </div>
				        		</div>
				          
				        		<div className="tab-pane fade" id="panel8" role="tabpanel">
	    
				            		<div className="modal-body">

						            	<div className="md-form form-sm mb-5">
						              		<input placeholder="First Name"
													onChange={firstnameOnChangeHandler}
													type="text" 
													id="firstname" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={firstname}
											/>
											<div><small className="text-danger">{firstnameAlert}</small></div>	
						
						              	</div>

						              	<div className="md-form form-sm mb-5"> 
						                	<input placeholder="Last Name"
													onChange={lastnameOnChangeHandler}
													type="text" 
													id="lastname" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={lastname}
											/>
											<div><small className="text-danger">{lastnameAlert}</small></div>		
						              	</div>

						              	<div className="md-form form-sm mb-5"> 
						                	<input placeholder="Email"
													onChange={emailOnChangeHandler}
													type="email" 
													id="email" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={email}
											/>
											<div><small className="text-danger">{emailAlert}</small></div>		
						              	</div>

						              	<div className="md-form form-sm mb-5">			                
						                	<input placeholder="Your username"
													onChange={usernameRegOnChangeHandler}
													type="text" 
													id="username-reg" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={usernameReg}
											/>
											<div><small className="text-danger">{usernameRegAlert}</small></div>		
						              	</div>

						              	<div className="md-form form-sm mb-5">			                
						                	<input placeholder="Password"
													onChange={passwordRegOnChangeHandler}
													type="password" 
													id="passwordCreateAcct" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={passwordReg}
											/>
						                	<div><small className="text-danger">{passwordRegAlert}</small></div>
						              	</div>

						              	<div className="md-form form-sm mb-4">			                
						               		<input placeholder="Confirm Password"
													onChange={confirmpwOnChangeHandler}
													type="password" 
													id="confirmpw" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={confirmpw}
											/>
											<div><small className="text-danger">{confirmpwAlert}</small></div>
						              	</div>

						              	<div className="form-group text-right">
											Staff / Guest?
											<select className="form-control" onChange={roleChangeHandler}>
												<option></option>
												{displayRoleOptions()}
											</select>

						               		<input placeholder="Staff Password"
													onChange={staffpwOnChangeHandler}
													type="password" 
													id="staffpw" 
													className="form-control form-control-sm validate"
													autoComplete="off"
													value={staffpw}
											/>
											<div><small className="text-danger">{staffpwAlert}</small></div>
						              
										</div>


						              	<div className="text-center form-sm mt-2">
						              	<Link to="/profile">
						                	<button className="btn btn-warning brown-text"
						                			disabled={disabledBtn} 
						                			type="button" 
													id="registerBtn"
													onClick={registerClickHandler}
						                	>
						                		SIGN UP 
						                		
						                	</button>
						                </Link>
						              	</div>
				            		</div>
				            
					           		<div className="modal-footer">
						              	<div className="options text-right">
						                	<p className="pt-1">
						                		Already have an account? 
						               			<a href="#panel7" 
						               				className="brown-text" 
						               				data-toggle="tab"
						               				role="tab">Log In
						               			</a>
						               		</p>
						            	</div>

					              		<button id="closeBtn-register"
					              				type="button" 
					              				className="btn ml-auto white-text" 
					              				data-dismiss="modal">
					              			Close
					              		</button>
			            			</div>
			        			</div>
			          
			       			</div>

			      		</div>
			    	</div>
			    
			  	</div>
			</div>
				</React.Fragment>
			);
		}
		else {
			return(
				<React.Fragment>
					{displayNav()}
		      		
				</React.Fragment>
			);
		}
	}
  return (
  	<BrowserRouter>
	    <div className="App">
	      {displayContent()}

	      
	      	<Route path="/book-court" exact component={BookCourt}/>
		  	<Route path="/contact" exact component={Contact}/>

		  	<i id="location-icon" 
		  		className="fa fa-map-marker fa-2x" 
		  		aria-hidden="true"
		  		data-toggle="modal" 
		  		data-target="#modal-gmaps"></i>

			
			<div id="modal-gmaps" className="modal fade">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5>Ready to sweat?</h5>
							<button className="close" data-dismiss="modal">
								<span className="text-white"> &times; </span>
							</button>
						</div>
						<div className="modal-body text-center">
							<iframe id="gmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247214.5609450294!2d120.91377630709404!3d14.500325634768148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d73e2b4aeec5%3A0xc04f7857018005da!2sTeeth+For+Keeps!5e0!3m2!1sen!2sph!4v1562227823999!5m2!1sen!2sph" allowfullscreen></iframe>
						</div>
						<div className="modal-footer text-right">
							<div>Smash Badminton Court <br/>Southwoods Interchange, Binan Laguna</div>
						</div>
					</div>							
				</div>						
			</div>	  
	    </div>
  	</BrowserRouter>
  );
}

export default App;
