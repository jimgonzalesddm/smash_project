import React, { useState, useEffect } from 'react';
import './Profile.css';
import Post from './Post.js';

function Profile() {
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user") ? true : false)
	let user = JSON.parse(localStorage.getItem("user"));
	let tokenUser = localStorage.getItem("token");

	let [posts, setPosts] = useState([]);
	let [post, setPost] = useState("");

	let [file, setFile] = useState("");
	// let [currentUser, setCurrentUser]=useState({});
	let [displayInputInfo, setDisplayInputInfo] = useState(false);
	let [firstName, setFirstname] = useState(user.firstName);
	let [lastName, setLastname] = useState(user.lastName);
	let [username, setUsername] = useState(user.username);

	useEffect( () => {
		fetch("http://localhost:8080/all-posts")
		.then(res => res.json())
		.then(posts => {
			console.log(posts)
			setPosts(posts);
		});
	}, []);

	// EDIT INFO functions
	let editInfoBtnOnClickHandler = () => {
		setDisplayInputInfo(true);
	}
	// refer to modal for edit info below
	let displayOrChangeInputInfo =() => {
		if(displayInputInfo === false) {
			return(
				<React.Fragment>
					<p>First name: <span>{user.firstName}</span></p>
					<p>Last name: <span>{user.lastName}</span></p>
					<p>Username: <span>{user.username}</span></p>
				</React.Fragment>
			);
		}
		else {
			return(
				<React.Fragment>
					<div className="p-2 flex-grow-1 bd-highlight">
						<form>
						<input 
								onChange={firstNameOnChangeInputHandler}
								className="form-control"
								type="text"
								id="firstName"
								autoComplete="off"
								value={firstName}
						/>
						</form>
					</div>
					<div className="p-2 flex-grow-1 bd-highlight">
						<form>
						<input 
								onChange={lastNameOnChangeInputHandler}
								className="form-control"
								type="text"
								id="lastName"
								autoComplete="off"
								value={lastName}
						/>
						</form>
					</div>
					<div className="p-2 flex-grow-1 bd-highlight">
						<form>
						<input 
								onChange={usernameOnChangeInputHandler}
								className="form-control"
								type="text"
								id="username"
								autoComplete="off"
								value={username}
						/>
						</form>
					</div>
					<button onClick={saveInfoClickHandler} type="submit" className="btn btn-info">
					SAVE 
					</button>
				</React.Fragment>
			);
		}
	}

	function firstNameOnChangeInputHandler(e) {
		setFirstname(e.target.value);
	}

	function lastNameOnChangeInputHandler(e) {
		setLastname(e.target.value);
	}
	function usernameOnChangeInputHandler(e) {
		setUsername(e.target.value);
	}

	function saveInfoClickHandler(e) {
		setFirstname(firstName);
		setLastname(lastName);
		setUsername(username);
		editInfo(firstName, lastName, username);
		setDisplayInputInfo(false);

	}

	let editInfo = (firstName, lastName, username) => {
		console.log(firstName, lastName, username)

		fetch("http://localhost:8080/users/"+user.id+"/"+firstName+"/"+lastName+"/"+username, {
			method: 'put',
			headers: {
				'Content-Type' : 'application/json',
				'x-auth-token': tokenUser
			}
		})
		.then(res => res.text())
		.then(user => {
			console.log(user)
			localStorage.setItem("user", user);
			window.location.reload();
		})

			
	}
 	// useEffect( () => {
		// fetch("http://localhost:8080/users/"+user.id, {
		// 		method: 'get',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			'x-auth-token': tokenUser
		// 		}
		// 	})
		// 	.then(res => res.text())
		// 	.then(user => {
		// 		console.log(user)
		// 		setCurrentUser(JSON.parse(user));
		// 	})
		// }, []);

	
	// POST functions
	let displayPosts = () => {
		if(posts.length > 0) {
			return(
				posts.map( post => 
					<Post key={post.id}
							content={post.content}
							currentUser={user}
							tokenUser={tokenUser}
							post={post}
							deletePost={deletePost}
							editPost={editPost}/>
				)
			);
		}
		else {
			return(
				<div>No posts to show. Post something.</div>
			);
		}
	}

	// add post
	let postOnChangeHandler = (e) => {
		setPost(e.target.value);
		
		console.log(e.target.value)
	}

	
	let postOnClickHandler = () => {
		if(post !== "") {
			let newPost = {
					content: post
				}
				fetch("http://localhost:8080/users/"+user.id+"/posts", {
					method: 'post',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': tokenUser
					},
					body: JSON.stringify(newPost)
				})
				.then(res => res.text())
				.then(post => {
					console.log(post)
					setPosts([...posts, JSON.parse(post)]);
				});	
			alert("successfully posted");
			setPost("");
		}
		else{
			alert("You should post something");
		}	
	}

	// delete post
	let deletePost = (post, postId) => {
		let updatedPosts = posts.filter( function(p) {
			return (post.id !== p.id)
		})
		setPosts(updatedPosts);

		fetch("http://localhost:8080/posts/"+postId, {
			method: 'delete',
			headers: {
				'Content-Type' : 'application/json',
				'x-auth-token': tokenUser
			}
		});
		alert("post deleted");
	}

	// edit post
	let editPost = (oldPost, editedPost) => {
		console.log(editedPost)
		let updatedPost = posts.map( function(p) {
			if(oldPost.id===p.id && editedPost !== p.content) {
				p.content = editedPost;
				fetch("http://localhost:8080/posts/"+p.id+"/"+p.content, {
					method: 'put',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': tokenUser
					}
				})
				.then(res => res.text())
				.then(data => {
					console.log(JSON.parse(data))
				})
				return p;
			}
			 else {
				return p;
			}
		});
		setPosts(updatedPost);
	}

	let imageChangeHandler = (e) => {
		setFile(e.target.files[0]);
		console.log(e.target.files)
	}

	let submitClickHandler = () => {
		console.log(file);
		let formData = new FormData(); 
		formData.append("file", file);
		console.log(formData)
		fetch("http://localhost:8080/users/"+user.id+"/upload", {
			method: 'post',
			headers: {
				'x-auth-token': tokenUser
			},
			body: formData
		})
		.then(res => res.text())
		.then(data => {
			console.log(data);
			fetch("http://localhost:8080/users/"+user.id, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': tokenUser
				}
			})
			.then(res => res.text())
			.then(user => {
				console.log(user)
				// setUser(JSON.parse(user));
				localStorage.setItem("user", user)
				window.location.reload();
			})
	
		});
	}
	console.log(user)
	
	return(
		<React.Fragment>
			<div id="jumbotron profile-jumbo mb-0">
			  	<p id="text">{user.username}</p>
			  	<div id="slanted"></div>

				<div id="profile-jumbo-bg"></div>
				
				<div id="post-textarea-div">
					<textarea onChange={postOnChangeHandler} className="form-control z-depth-1" id="post-textarea" rows="3" placeholder="Say something..."></textarea>
					<button onClick={postOnClickHandler} id="postBtn">Post</button>
				</div>
			  	<div id="side-div-green"className="side-div d-flex justify-content-around">
			  		<p className="text-left mt-4"
			  			data-toggle="modal" 
			  			data-target="#userDetails">{user.firstName} {user.lastName}
			  		</p>
			  		<img id="user-image" src={"http://localhost:8080/image/"+user.image} alt="..."
			  			data-toggle="modal" data-target="#profilepicUploader"/>		  				  		
			  	</div>

			  	<div id="post-container">
				  	{displayPosts()}

			  	</div>

			</div>

			{/* modals */}	
				{/* modal for user info */}
				<div className="modal fade" id="userDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">Information</h5>
				        <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        {displayOrChangeInputInfo()}
				        
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn" data-dismiss="modal">Close</button>
				        <button onClick={editInfoBtnOnClickHandler} type="submit" className="btn">Edit Info</button>
				      </div>
				    </div>
				  </div>
				</div>

				{/* modal for pic uploader */}
				<div className="modal fade" id="profilepicUploader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">Change Profile Picture</h5>
				        <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        <form encType="multipart/form-data">
				        <i class="fa fa-file-image-o" aria-hidden="true"></i> <input onChange={imageChangeHandler} type="file"/> 
				        </form>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn" data-dismiss="modal">Close</button>
				        <button onClick={submitClickHandler} type="submit" className="btn">Save changes</button>
				      </div>
				    </div>
				  </div>
				</div>
		</React.Fragment>	
	);
}

export default Profile;