import React, { useState, useEffect } from 'react';
import './Post.css';
import Comment from './Comment.js';

function Post(props) {
	console.log(props.post.user)
	let [displayInputPost, setDisplayInputPost] = useState(false);
	let [postContent, setPostContent] = useState(props.post.content);

	let [comments, setComments] = useState([]);
	let [comment, setComment] = useState("");
	let [displayCommentBox, setDisplayCommentBox] = useState(false);

	useEffect( () => {
		fetch("http://localhost:8080/posts/"+props.post.id+"/all-comments", {
			method: 'get',
				headers: {
					'Content-Type' : 'application/json',
					'x-auth-token': props.tokenUser
				},
		})
		.then(res => res.json())
		.then(comments => {
			console.log(comments)
			setComments(comments);
		});
	}, []);

	let displayComments = () => {
		 if(comments.length > 0) {
		 	return(
			 	comments.map( comment =>
					<Comment 
	                    comment={comment}
	                    currentUser={props.currentUser}
	                    deleteComment={deleteComment}
	                    editComment={editComment}
	                   />
				)
		 	);
		}
	}

	let showCommentBox = () => {
		if(displayCommentBox) {
		return(
		         <div className="card gedf-card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true"> Write a comment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <label className="sr-only" for="message">post</label>
                                    <textarea onChange={commentBoxOnChangeHandler}
                                    			className="form-control" 
                                    			id="message" 
                                    			rows="3" 
                                    			placeholder="Leave a reply..."
                                    			value={comment}>
                                    </textarea>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label" for="customFile">Upload image</label>
                                    </div>
                                </div>
                                <div className="py-4"></div>
                            </div>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button onClick={shareCommentBtnOnClickHandler} type="submit" className="btn btn-primary">share comment</button>
                            </div>
                            <div className="btn-group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className="fa fa-globe"></i>
                                </button>
                                <span onClick={closeCommentBoxOnclickHandler} className="text-primary closeCommentBoxBtn">close</span>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                                    <a className="dropdown-item" href="#"><i className="fa fa-globe"></i> Public</a>
                                    <a className="dropdown-item" href="#"><i className="fa fa-users"></i> Friends</a>
                                    <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Just me</a>
                                </div>
                            </div>
                        </div>
                    </div>      
                </div>
        	);
		}
	
	}

	let closeCommentBoxOnclickHandler = () => setDisplayCommentBox(false);

	let commentOnClickHandler = () => setDisplayCommentBox(true);

	let commentBoxOnChangeHandler = (e) => setComment(e.target.value);

	let shareCommentBtnOnClickHandler = () => {
		if(comment !== "") {
			let newComment = {
					comment: comment
				}
				fetch("http://localhost:8080/posts/"+props.post.id+"/users/"+props.currentUser.id+"/comments", {
					method: 'post',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': props.tokenUser
					},
					body: JSON.stringify(newComment)
				})
				.then(res => res.text())
				.then(comment => {
					console.log(comment)
					setComments([...comments, JSON.parse(comment)])
				});	
			alert("You commented on "+props.post.user.username+"'s post.");
		
			setDisplayCommentBox(false);
			setComment("");
		}
		else {
			alert("You should write something.")
		}
	}

	// delete comment
	let deleteComment = (comment, commentId) => {
		let updatedComments = comments.filter( function(c) {
			return (commentId !== c.id)
		})
		setComments(updatedComments);

		fetch("http://localhost:8080/comments/"+commentId, {
			method: 'delete',
			headers: {
				'Content-Type' : 'application/json',
				'x-auth-token': props.tokenUser
			}
		});
		alert("comment deleted");
	}

	// edit comment
	let editComment = (comm, editedComment) => {
		console.log(editedComment)
		let updatedComments = comments.map( function(c) {
			if(comm.id===c.id && editedComment !== c.comment) {
				c.comment = editedComment;
				fetch("http://localhost:8080/comments/"+c.id+"/"+c.comment, {
					method: 'put',
					headers: {
						'Content-Type' : 'application/json',
						'x-auth-token': props.tokenUser
					}
				})
				.then(res => res.text())
				.then(data => {
					console.log(JSON.parse(data))
				})
				return c;
			} 
			else {
				return c;
			}
		});
		setComments(updatedComments);
	
	}

	// console.log(props.currentUser.id, props.post.user.id, props.post,props.user.admin)
	
	let deleteClickHadler = () => {
		props.deletePost(props.post, props.post.id);
	}

	// edit
	let editBtnClicked = () => {
		if(displayInputPost === false) {
			return(
				setDisplayInputPost(true)
			);
		}
	} 

	let onChangeInputHandler = (e) => setPostContent(e.target.value);
	
	function onKeyPressHandler(e) {
		setPostContent(e.target.value);
		props.editPost(props.post, postContent);
		setDisplayInputPost(false);
		console.log(postContent)
	}

	let displayOrChangeInputPost =() => {
		if(displayInputPost === false) {
			return(
				<p id="post-content" className="card-text">
                    {props.content}
                </p>
			);
		}
		else {
			return(
				<div className="p-2 flex-grow-1 bd-highlight">
					<form>
					<input 
							onChange={onChangeInputHandler}
							className="form-control"
							type="text"
							rows="3"
							autoComplete="off"
							value={postContent}
					/>
					<span onClick={onKeyPressHandler} className="text-info">submit</span>
					</form>
				</div>
			);
		}
	}

	// dropdown to edit or delete
	let showIcon = () => {
		if(props.currentUser.id === props.post.user.id) {
			return(
			<div>
                <div className="dropdown">
                    <button className="btn btn-link dropdown-toggle p-0" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-ellipsis-h fa-xs"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-left" aria-labelledby="gedf-drop1">
                        <div className="dropdown-header">Actions</div>
                        <a onClick={editBtnClicked} className="dropdown-item text-info">Edit</a>
                        <a onClick={deleteClickHadler} className="dropdown-item text-info">Delete</a>
                    </div>
                </div>
            </div>
			);
		}
		else if (props.currentUser.admin === true) {
			return(
			<div>
                <div className="dropdown">
                    <button className="btn btn-link dropdown-toggle p-0" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-ellipsis-h fa-xs"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-left" aria-labelledby="gedf-drop1">
                        <a onClick={deleteClickHadler} className="dropdown-item text-info">Delete</a>
                    </div>
                </div>
            </div>
			);
		}
	}

	return(
		<React.Fragment>
			<div className="card gedf-card post-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" height="45"  src={"http://localhost:8080/image/"+props.post.user.image} alt=""/>
                                </div>
                                <div className="ml-2">
                                    <div className="post-name m-0">{props.post.user.username}</div>
                                    <div className="post-name text-muted">{props.post.user.firstName} {props.post.user.lastName}</div>
                                </div>
                            </div>
                            <div>   
                                {showIcon()}
                            </div>
                        </div>
                        
                    </div>
                    <div className="card-body">
                        <div className="text-muted mb-2"> <i className="fa fa-clock-o"></i></div>

                         {displayOrChangeInputPost()}
                    </div>
                    <div className="card-footer mb-2">
                        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                        <a id="commentBtn" onClick={commentOnClickHandler} className="card-link text-primary"><i className="fa fa-comment" style={{color: "primary"}}></i> Comment</a>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                    </div>
                    <div id="comments-sec-div">
	                    <div className="comments-section d-flex flex-column">
	                    	{showCommentBox()}
	                    	{displayComments()}	
	                    </div>
                    </div>
                </div>
       </React.Fragment>
	);
}

export default Post;