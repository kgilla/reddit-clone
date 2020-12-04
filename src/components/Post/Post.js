import "./Post.css";

const Post = (props) => {
  return (
    <div className="post-container">
      <header>
        <p>Posted by {props.post.author.username}</p>
        <p>On {props.post.dateCreated}</p>
      </header>
      <main>
        <h3>{props.post.title}</h3>
        <p>{props.post.content}</p>
      </main>
      <footer>
        <p>{props.post.score}</p>
        <p>{props.post.comments.length} comments</p>
      </footer>
    </div>
  );
};

export default Post;
