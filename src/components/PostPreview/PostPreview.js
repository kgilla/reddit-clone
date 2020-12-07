import "./PostPreview.css";

const PostPreview = ({ post }) => {
  console.log(post);
  return (
    <div className="post-preview-container">
      <header className="post-preview-header">
        <p>Posted by {post.author.username}</p>
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
  );
};

export default PostPreview;
