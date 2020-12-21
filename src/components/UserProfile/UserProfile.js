import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import { useAuth } from "../../hooks/use-auth";
import { fetchGetData } from "../../api";
import Post from "../Post";
import Comment from "../Comment";

const UserProfile = () => {
  const auth = useAuth();
  const { username } = useParams() || "";
  const [content, setContent] = useState("posts");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGetData(
          `http://localhost:3000/api/users/${username}`
        );
        console.log(response);
        setUser(response.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [username]);

  const handleClick = (e) => {
    e.target.name === "posts" ? setContent("posts") : setContent("comments");
  };

  const mapPosts = () => {
    return user.posts.map((post) => <Post post={post} />);
  };

  const mapComments = () => {
    return user.comments.map((comment) => (
      <div className="comment-box">
        {comment.post}
        <Comment comment={comment} />
      </div>
    ));
  };

  return user ? (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <div>
          <button onClick={handleClick} name="posts">
            Posts
          </button>
          <button onClick={handleClick} name="comments">
            Comments
          </button>
        </div>
        {content === "posts" ? mapPosts() : mapComments()}
      </div>
      <div className="user-details">
        <h1>{user.username}</h1>
        <h2>{user.posts.length} posts</h2>
        <h2>{user.comments.length} comments</h2>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default UserProfile;
