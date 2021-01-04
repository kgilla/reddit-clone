import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import { useAuth } from "../../hooks/use-auth";
import { useWindowSize } from "../../hooks/use-window-size";
import { fetchGetData } from "../../api";
import Post from "../Post";
import Comment from "../Comment";
import Sidebar from "../Sidebar";

const UserProfile = () => {
  const auth = useAuth();
  const size = useWindowSize();
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

  const calcScore = () => {
    let score = 0;
    user.posts.forEach((post) => (score += post.score));
    user.comments.forEach((comment) => (score += comment.score));
    return score;
  };

  const handleClick = (e) => {
    e.target.name === "posts" ? setContent("posts") : setContent("comments");
  };

  const mapPosts = () => {
    return user.posts.map((post) => <Post key={post._id} post={post} />);
  };

  const mapComments = () => {
    return user.comments.map((comment) => (
      <div className="comment-box" key={comment._id}>
        <div>
          {comment.post.title} posted by {comment.post.author.username}
        </div>
        <Comment comment={comment} />
      </div>
    ));
  };

  return user ? (
    <div className="user-profile-container">
      <nav className="profile-nav">
        <button
          onClick={handleClick}
          name="posts"
          className="profile-nav-button"
          style={
            content === "posts" ? { borderBottom: "2px solid #222" } : null
          }
        >
          Posts ({user.posts.length})
        </button>
        <button
          onClick={handleClick}
          name="comments"
          className="profile-nav-button"
          style={
            content === "comments" ? { borderBottom: "2px solid #222" } : null
          }
        >
          Comments ({user.comments.length})
        </button>
      </nav>
      <div className="user-profile-content">
        {content === "posts" ? mapPosts() : mapComments()}
      </div>
      {size.width > 800 ? (
        <div className="user-details">
          <Sidebar user={user} score={calcScore()} />
        </div>
      ) : null}
    </div>
  ) : (
    <Loader />
  );
};

export default UserProfile;
