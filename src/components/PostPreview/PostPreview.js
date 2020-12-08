import "./PostPreview.css";
import { Link } from "react-router-dom";

const PostPreview = ({ post }) => {
  console.log(post);
  return (
    <Link to={`/s/${post.sub}/posts/${post._id}`}>
      <div className="post-preview-container">
        <header className="post-preview-header">
          <p>
            {post.author ? `Posted by ${post.author.username}` : "[Deleted]"}
          </p>
          <p>On {post.dateCreated}</p>
        </header>
        <main className="post-preview-main">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </main>
        <footer className="post-preview-footer">
          <p>{post.score}</p>
          <p>{post.comments.length} comments</p>
        </footer>
      </div>
    </Link>
  );
};

export default PostPreview;
