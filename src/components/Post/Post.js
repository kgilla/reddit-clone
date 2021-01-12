import "./Post.css";
import { Link, useHistory } from "react-router-dom";
import { Message } from "@styled-icons/entypo";
import { useFlash } from "../../hooks/use-flash-message";
import { useAuth } from "../../hooks/use-auth";
import { useWindowSize } from "../../hooks/use-window-size";
import moment from "moment";
import Score from "../Score";
import { useState } from "react";
import { fetchPutData, fetchDeleteData } from "../../api";
import { baseUrl } from "../../config/const";

const Post = ({ post, link, handleRemove }) => {
  const [score, setScore] = useState(post.score);
  const flash = useFlash();
  const auth = useAuth();
  const windowSize = useWindowSize();
  const history = useHistory();

  const handleClick = async (e) => {
    let result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      const url = `${baseUrl}/api/s/${post.sub._id}/posts/${post._id}/delete`;
      const response = await fetchDeleteData(url, auth.token);
      if (response.ok) {
        flash.changeMessage("Post deleted successfully!");
        handleRemove ? handleRemove(post._id) : history.push("/");
      } else {
        console.log("Not Okay.");
      }
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
    const url = `${baseUrl}/api/s/${post.sub._id}/posts/${post._id}/vote`;
    const response = await fetchPutData(url, { value }, auth.token);
    console.log(response);
  };

  const youtubeParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  return (
    <div className="post-container">
      {windowSize.width > 800 ? (
        <Score
          score={score}
          item={post}
          type="post"
          handleChoice={handleScoreChange}
        />
      ) : null}
      <article>
        <header className="card-header">
          <Link to={`/s/${post.sub._id}`} className="header-item sub-link">
            {post.sub.name}
          </Link>
          <span className="header-item">Posted by</span>
          {post.author ? (
            <Link
              to={`/users/${post.author.username}`}
              className="header-item profile-link"
            >
              {post.author.username}
            </Link>
          ) : (
            "[Deleted]"
          )}
          <span className="header-item">
            {moment(post.dateCreated).startOf("hour").fromNow()}
          </span>
          {post.dateEdited ? (
            <span className="header-item edited-item">
              edited {moment(post.dateEdited).startOf("hour").fromNow()}
            </span>
          ) : null}
        </header>
        <main className="card-main">
          <h2 className="post-title">{post.title}</h2>
          {post.type === "video" ? (
            <iframe
              title={post.title}
              className="post-content-video"
              src={`https://www.youtube.com/embed/${youtubeParser(
                post.content
              )}`}
              frameBorder="0"
            ></iframe>
          ) : post.type === "link" ? (
            <div>
              {" "}
              <a className="post-content-link" href={post.content}>
                {post.content}
              </a>
            </div>
          ) : post.type === "image" ? (
            <img
              className="post-image"
              alt="Post Image"
              src={post.content}
            ></img>
          ) : (
            <p className="post-content">{post.content}</p>
          )}
        </main>
        <footer className="card-footer">
          {windowSize.width < 800 ? (
            <Score
              score={score}
              item={post}
              type="post"
              handleChoice={handleScoreChange}
            />
          ) : null}
          <span className="footer-item footer-reply">
            <Message className="reply-bubble" />
            {post.commentCount === 1
              ? "1 Comment"
              : post.commentCount + " Comments"}
          </span>
          {auth.user && auth.user._id === post.author._id ? (
            <Link
              to={`/s/${post.sub._id}/posts/${post._id}/update`}
              className="footer-item"
            >
              Edit
            </Link>
          ) : null}
          {auth.user && auth.user._id === post.author._id ? (
            <button className="footer-item" name="delete" onClick={handleClick}>
              Delete
            </button>
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
