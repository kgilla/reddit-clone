import "./Post.css";
import { Link } from "react-router-dom";
import { Message } from "@styled-icons/entypo";
import { useAuth } from "../../hooks/use-auth";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import Score from "../Score";
import { useState } from "react";
import { fetchPutData, fetchDeleteData } from "../../api";

const Post = ({ post, link }) => {
  const [score, setScore] = useState(post.score);
  const auth = useAuth();

  const handleClick = async (e) => {
    let result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      const url = `http://localhost:3000/api/s/${post.sub._id}/posts/${post._id}/delete`;
      const response = await fetchDeleteData(url, auth.token);
      console.log(response);
    }
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
    const url = `http://localhost:3000/api/s/${post.sub._id}/posts/${post._id}/vote`;
    await fetchPutData(url, { value }, auth.token);
  };

  return (
    <div className="post-container">
      <Score
        score={score}
        item={post}
        type="post"
        handleChoice={handleScoreChange}
      />
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
        {auth.user ? (
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
        ) : null}
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
