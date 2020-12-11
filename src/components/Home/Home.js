import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import Post from "../Post";
import Sidebar from "../Sidebar";

const Home = ({ user }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData("http://localhost:3000/api/s/all");
      console.log(response);
      setPosts(response.posts);
    };
    fetchData();
  }, []);

  return (
    <div className="sub-container">
      <header className="sub-header">Homepage</header>
      {posts ? (
        <main className="sub-page">
          <div id="posts-container">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
          <Sidebar
            sub={{
              name: "Homepage",
              description: "Your personalized homepage",
            }}
          />
        </main>
      ) : null}
    </div>
  );
};

export default Home;
