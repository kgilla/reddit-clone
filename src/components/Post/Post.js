import "./Post.css";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, Message } from "@styled-icons/entypo";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

const Post = ({ post, link }) => {
  const auth = useAuth();
  const [score, setScore] = useState(post.score);

  const handleClick = (e) => {
    let result = window.confirm("Are you sure you want to delete this post?");
    console.log(result);
  };

  return (
    <div className="post-container">
      <div className="score-box">
        <ArrowUp
          className="score-arrow"
          id="up-arrow"
          onClick={() => setScore((oldScore) => (oldScore += 1))}
        />
        {score}
        <ArrowDown
          className="score-arrow"
          id="down-arrow"
          onClick={() => setScore((oldScore) => (oldScore -= 1))}
        />
      </div>
      <article>
        <header className="card-header">
          <Link to={`/s/${post.sub._id}`} className="sub-link">
            {post.sub.name}
          </Link>
          <span className="header-item">
            Posted by{" "}
            {post.author ? (
              <Link
                to={`/users/${post.author.username}`}
                className="profile-link"
              >
                {post.author.username}
              </Link>
            ) : (
              "[Deleted]"
            )}
          </span>
          <span className="header-item">
            ~ {moment(post.dateCreated).startOf("hour").fromNow()}
          </span>
          {post.dateEdited ? (
            <span className="header-item edited-item">
              edited {moment(post.dateEdited).startOf("hour").fromNow()}
            </span>
          ) : null}
        </header>
        <main className="card-main">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{ReactHtmlParser(post.content)}</p>
        </main>
        <footer className="card-footer">
          <span className="footer-item">
            <Message className="reply-bubble" />
            {post.commentCount === 1
              ? "1 Comment"
              : post.commentCount + " Comments"}
          </span>
          {auth.user && auth.user._id === post.author._id ? (
            <div className="footer-button-container">
              <Link
                to={`/s/${post.sub._id}/posts/${post._id}/update`}
                className="footer-button"
              >
                Edit
              </Link>
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
      </article>
      {link ? (
        <Link
          to={`/s/${post.sub._id}/posts/${post._id}`}
          className="post-link"
        ></Link>
      ) : null}
    </div>
  );
};

export default Post;
