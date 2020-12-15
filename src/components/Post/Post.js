import "./Post.css";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "@styled-icons/entypo";
import { useState } from "react";
import moment from "moment";

const Post = ({ post, link }) => {
  const [score, setScore] = useState(post.score);

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
          {post.author ? (
            <Link
              to={`/users/${post.author.username}`}
              className="profile-link"
            >
              {post.author.username}
            </Link>
          ) : (
            <span className="card-item">[Deleted]</span>
          )}
          <span className="card-item">
            ~ {moment(post.dateCreated).startOf("hour").fromNow()}
          </span>
        </header>
        <main className="card-main">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
        </main>
        <footer className="card-footer">
          <span className="card-item">
            {post.commentCount === 1
              ? "1 Comment"
              : post.commentCount + " Comments"}
          </span>
        </footer>
      </article>
      {link ? (
        <Link
          to={`/s/${post.sub}/posts/${post._id}`}
          className="post-link"
        ></Link>
      ) : null}
    </div>
  );
};

export default Post;
