import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import Post from "../Post";
import Sidebar from "../Sidebar";
import Loader from "../Loader";

const Home = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchGetData(
          "http://localhost:3000/api/s/user/posts/home",
          auth.token
        );
        setPosts(response.posts);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllData = async () => {
      try {
        const response = await fetchGetData(
          "http://localhost:3000/api/s/home/posts/"
        );
        setPosts(response.posts);
      } catch (err) {
        console.log(err);
      }
    };

    auth.user ? fetchUserData() : fetchAllData();
  }, []);

  return (
    <div className="sub-container">
      {posts ? (
        <main className="sub-page">
          <div className="posts-container">
            {posts.map((post) => (
              <Post key={post._id} post={post} link={true} />
            ))}
          </div>
          <Sidebar
            sub={{
              name: "Homepage",
              description: "Your personalized homepage",
            }}
          />
        </main>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
