import CommentForm from "../CommentForm";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import moment from "moment";
import { ArrowUp, ArrowDown, Message } from "@styled-icons/entypo";
import "./Comment.css";

const Comment = ({
  comment,
  post,
  refreshPost,
  layer,
  changeMessage,
  children,
}) => {
  const auth = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [score, setScore] = useState(comment.score);

  const handleClick = (e) => {
    if (e.target.name === "delete") {
      handleDelete();
    } else {
      if (e.target.name === "edit") {
        setEdit(true);
      }
      if (openForm) {
        setOpenForm(false);
        setEdit(false);
      } else {
        setOpenForm(true);
      }
    }
  };

  const handleDelete = () => {
    let result = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    console.log(result);
  };

  return (
    <div className={comment.parent ? "comment-reply" : "comment-container"}>
      <div className="comment">
        <div className="comment-score-box">
          <ArrowUp
            className="score-arrow"
            id="up-arrow"
            onClick={() => setScore((oldScore) => (oldScore += 1))}
          />
          <ArrowDown
            className="score-arrow"
            id="down-arrow"
            onClick={() => setScore((oldScore) => (oldScore -= 1))}
          />
        </div>
        <article>
          <header className="card-header">
            <span className="card-item">{comment.author.username}</span>
            <span className="card-item">
              {score === 1 ? `${score} point` : `${score} points`}
            </span>
            <span className="card-item">
              - {moment(comment.dateCreated).startOf("hour").fromNow()}
            </span>
            {comment.dateEdited ? (
              <span className="card-item edited-item">
                edited {moment(comment.dateEdited).startOf("hour").fromNow()}
              </span>
            ) : null}
          </header>
          <main className="card-main">
            <span>{comment.content}</span>
          </main>
          <footer className="card-footer">
            {layer < 6 ? (
              <button onClick={handleClick} className="footer-button">
                <Message className="reply-bubble" />
                Reply
              </button>
            ) : null}
            {auth.user && auth.user._id === comment.author._id ? (
              <div className="footer-button-container">
                <button
                  className="footer-button"
                  name="edit"
                  onClick={handleClick}
                >
                  Edit
                </button>
                <button
                  className="footer-button"
                  name="delete"
                  onClick={handleClick}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </footer>
          {openForm ? (
            <CommentForm
              post={post}
              parentComment={comment}
              refreshPost={refreshPost}
              handleForm={handleClick}
              changeMessage={changeMessage}
              edit={edit}
            />
          ) : null}
        </article>
      </div>
      {children}
    </div>
  );
};

export default Comment;
