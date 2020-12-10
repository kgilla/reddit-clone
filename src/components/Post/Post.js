import "./Post.css";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "@styled-icons/entypo";
import { useState } from "react";
import moment from "moment";

const Post = ({ post, link }) => {
  const [score, setScore] = useState(post.score);

  const determineCommentsLength = () => {
    let length = 0;
    for (let i = 0; i < post.comments.length; i++) {
      post.comments[i].replies
        ? (length += post.comments[i].replies.length + 1)
        : length++;
    }
    return length;
  };

  return (
    <div className="post-container">
      <div className="score-box">
        <ArrowUp
          className="score-arrow"
          onClick={() => setScore((oldScore) => (oldScore += 1))}
        />
        {score}
        <ArrowDown
          className="score-arrow"
          onClick={() => setScore((oldScore) => (oldScore -= 1))}
        />
      </div>
      <article>
        <header className="card-header">
          <span className="card-item">
            {post.author ? `Posted by ${post.author.username}` : "[Deleted]"}
          </span>
          <span className="card-item">
            {moment(post.dateCreated).startOf("hour").fromNow()}
          </span>
        </header>
        <main className="card-main">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </main>
        <footer className="card-footer">
          <span className="card-item">
            {determineCommentsLength()} comments
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
