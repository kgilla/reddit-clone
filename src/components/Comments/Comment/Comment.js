import CommentForm from "../../CommentForm";
import { useState } from "react";
import "./Comment.css";

const Comment = ({ comment, user, handleNewComment, children, reply }) => {
  const [openForm, setOpenForm] = useState(false);

  const handleClick = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
  };

  return (
    <div className="comment-container">
      {comment.parent ? (
        <div className="comment-reply">
          <h2>{comment.author.username}</h2>
          <p>{comment.content}</p>
          <p>{comment.dateCreated}</p>
        </div>
      ) : (
        <div className="comment">
          <h2>{comment.author.username}</h2>
          <p>{comment.content}</p>
          <p>{comment.dateCreated}</p>
          <button onClick={handleClick}>Reply</button>
        </div>
      )}
      {openForm ? (
        <CommentForm
          user={user}
          parent={comment._id}
          handleNewComment={handleNewComment}
        />
      ) : null}
      {children}
    </div>
  );
};

export default Comment;
