import "./Post.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetData } from "../../api";
import Comments from "../Comments";

const Post = ({ user }) => {
  const { subID, postID } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        `http://localhost:3000/api/s/${subID}/posts/${postID}`
      );
      console.log(response.post);
      setPost(response.post);
    };
    fetchData();
  }, []);

  return (
    <div className="post-container">
      {post ? (
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
      ) : null}
      {post ? <Comments comments={post.comments} user={user} /> : null}
    </div>
  );
};

export default Post;
