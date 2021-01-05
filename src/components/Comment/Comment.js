import CommentForm from "../CommentForm";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";
import Score from "../Score";
import moment from "moment";
import { Message } from "@styled-icons/entypo";
import { fetchPutData } from "../../api";
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

  const handleScoreChange = (direction, increment) => {
    setScore((old) => (old += increment));
    if (direction === "up") {
      castVote(true);
    } else if (direction === "down") {
      castVote(false);
    } else {
      castVote(null);
    }
  };

  const castVote = async (value) => {
    const url = `http://localhost:3000/api/s/${post.sub._id}/posts/${post._id}/comments/${comment._id}/vote`;
    await fetchPutData(url, { value }, auth.token);
  };

  return (
    <div className={comment.parent ? "comment-reply" : "comment-container"}>
      <div className="comment">
        <Score
          score={score}
          item={comment}
          type="comment"
          handleChoice={handleScoreChange}
        />
        <article>
          <header className="card-header">
            <Link
              className="profile-link"
              to={`/users/${comment.author.username}`}
            >
              {comment.author.username}
            </Link>
            <span className="header-item">
              {score === 1 ? score + " point" : score + " points"}
            </span>
            <span className="header-item">
              - {moment(comment.dateCreated).startOf("hour").fromNow()}
            </span>
            {comment.dateEdited ? (
              <span className="header-item edited-item">
                edited {moment(comment.dateEdited).startOf("hour").fromNow()}
              </span>
            ) : null}
          </header>
          <main className="card-main">
            <span>{comment.content}</span>
          </main>
          {auth.user ? (
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
          ) : null}
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
