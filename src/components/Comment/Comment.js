import CommentForm from "../CommentForm";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import moment from "moment";
import { ArrowUp, ArrowDown, Message } from "@styled-icons/entypo";
import "./Comment.css";

const Comment = ({ comment, handleNewComment, layer, children }) => {
  const auth = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [score, setScore] = useState(comment.score);

  const handleClick = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
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
          </header>
          <main className="card-main">
            {" "}
            <span>{comment.content}</span>
          </main>
          <footer className="card-footer">
            {layer < 6 ? (
              <button onClick={handleClick} className="reply-button">
                <Message className="reply-bubble" />
                Reply
              </button>
            ) : null}
            {auth.user._id === comment.author._id ? <span>Edit</span> : null}
          </footer>
          {openForm ? (
            <CommentForm
              parent={comment._id}
              handleNewComment={handleNewComment}
              handleClick={handleClick}
            />
          ) : null}
        </article>
      </div>
      {children}
    </div>
  );
};

export default Comment;
