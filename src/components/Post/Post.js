import "./Post.css";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "@styled-icons/entypo";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

const Post = ({ post, link }) => {
  console.log(post);
  const auth = useAuth();
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

          <span className="card-item">
            ~ {moment(post.dateCreated).startOf("hour").fromNow()}
          </span>
        </header>
        <main className="card-main">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{ReactHtmlParser(post.content)}</p>
        </main>
        <footer className="card-footer">
          <span className="card-item">
            {post.commentCount === 1
              ? "1 Comment"
              : post.commentCount + " Comments"}
          </span>
          {auth.user && auth.user._id === post.author._id ? (
            <Link to={`/s/${post.sub._id}/posts/${post._id}/update`}>Edit</Link>
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
