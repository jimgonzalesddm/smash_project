import React, { useState, useEffect } from 'react';
import './Comment.css';

function Comment(props) {

	let [displayInputComment, setDisplayInputComment] = useState(false);
	let [commentContent, setCommentContent] = useState(props.comment.comment);

	// delete function
	let deleteClickHadler = () => {
		props.deleteComment(props.comment, props.comment.id);
		console.log(props.comment, props.comment.id)
	}

	// edit functions
	let editBtnClicked = () => {
		if(displayInputComment === false) {
			return(
				setDisplayInputComment(true)
			);
		}
	} 

	let onChangeInputHandler = (e) => setCommentContent(e.target.value);
	
	function onKeyPressHandler(e) {
		setCommentContent(e.target.value);
		props.editComment(props.comment, commentContent);
		setDisplayInputComment(false);
	}

	let displayOrChangeInputComment =() => {
		if(displayInputComment === false) {
			return(
				<p className="card-text">
                    {props.comment.comment}
                </p>
			);
		}
		else {
			return(
				<div className="p-2 flex-grow-1 bd-highlight">
					<form className="d-flex justify-content-around">
					<input 
							onChange={onChangeInputHandler}
							className="form-control"
							type="text"
							rows="3"
							autoComplete="off"
							value={commentContent}
					/>
					<p onClick={onKeyPressHandler} className="text-info ml-2 submit=-edit">submit</p>
					</form>
				</div>
			);
		}
	}

	// dropdown to edit or delete
	let showIcon = () => {
		if(props.currentUser.id === props.comment.user.id) {
			return(
				<div>
	                <div className="dropdown">
	                    <button className="btn btn-link dropdown-toggle ml-0 p-0" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                        <i className="fa fa-ellipsis-h fa-xs"></i>
	                    </button>
	                    <div className="dropdown-menu" aria-labelledby="gedf-drop1">
	                        <a onClick={editBtnClicked} className="dropdown-item text-info">Edit</a>
	                        <a onClick={deleteClickHadler} className="dropdown-item text-info">Delete</a>
	                    </div>
	                </div>
	            </div>
			);
		}
		else if(props.currentUser.admin === true) {
			return(
				<div>
	                <div className="dropdown">
	                    <button className="btn btn-link dropdown-toggle ml-0 p-0" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                        <i className="fa fa-ellipsis-h fa-xs"></i>
	                    </button>
	                    <div className="dropdown-menu" aria-labelledby="gedf-drop1">
	                        <a onClick={deleteClickHadler} className="dropdown-item text-info">Delete</a>
	                    </div>
	                </div>
	            </div>
			);
		}
	}

	return(
			<div className="d-flex bd-highlight ">
                <div className="pt-2 pl-2 pr-0 mr-0 bd-highlight">
                    <img className="rounded-circle" width="45" height="45" src={"http://localhost:8080/image/"+props.comment.user.image} alt=""/>
                </div>
                    <div className="pt-2 pb-2 flex-grow-1 bd-highlight align-self-center commentArea-div">
                        <div className="ml-2  commentArea d-flex align-items-center">
                            <div className="ml-2 text-info username-comment">{props.comment.user.username}</div>
                            
	                        <span><div className="ml-2">{displayOrChangeInputComment()}</div></span>
                        </div>
                    </div>
                    <span className="mr-2 p-2 bd-highlights">   
                        {showIcon()}
                   	</span>
         	</div>
          
	);
}

export default Comment;