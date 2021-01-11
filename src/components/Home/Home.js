import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";
import Post from "../Post";
import Sidebar from "../Sidebar";
import Loader from "../Loader";
import { Surprise } from "@styled-icons/fa-solid";
import { baseUrl } from "../../config/const";

const Home = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchGetData(
          `${baseUrl}/api/s/user/posts/home`,
          auth.token
        );
        setPosts(response.posts);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllData = async () => {
      try {
        const response = await fetchGetData(`${baseUrl}/api/s/home/posts/`);
        setPosts(response.posts);
      } catch (err) {
        console.log(err);
      }
    };

    auth.user ? fetchUserData() : fetchAllData();
  }, [auth.user, auth.token]);

  const removePost = (id) => {
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  };

  return (
    <div className="sub-container">
      {posts ? (
        <main className="sub-page">
          <div className="posts-container">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  link={true}
                  handleRemove={removePost}
                />
              ))
            ) : (
              <div className="empty-sub">
                <h1>Subscribe to communities to get started</h1>
                <Surprise className="empty-sub-icon" />
                <Link to="/s/browse" className="button-filled">
                  Browse Communities
                </Link>
              </div>
            )}
          </div>
          <Sidebar
            sub={
              auth.user
                ? {
                    name: "Homepage",
                    description: "Your personalized homepage",
                  }
                : {
                    name: "All",
                    description: "All the newest posts from every community",
                  }
            }
          />
        </main>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
