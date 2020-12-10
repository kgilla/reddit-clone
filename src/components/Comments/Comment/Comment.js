import CommentForm from "../../CommentForm";
import { useState } from "react";
import moment from "moment";
import "./Comment.css";

const Comment = ({ comment, user, handleNewComment, layer, children }) => {
  const [openForm, setOpenForm] = useState(false);

  const handleClick = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
  };

  return (
    <div className={comment.parent ? "comment-reply" : "comment-container"}>
      <header className="card-header">
        <span className="card-item">{comment.author.username}</span>
        <span className="card-item">
          {moment(comment.dateCreated).startOf("hour").fromNow()}
        </span>
      </header>
      <main className="card-main">
        {" "}
        <span>{comment.content}</span>
      </main>
      <footer className="card-footer">
        {" "}
        {layer < 6 ? (
          <button onClick={handleClick} className="reply-button">
            Reply
          </button>
        ) : null}
      </footer>
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
