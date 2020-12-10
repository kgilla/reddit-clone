import { useState, useEffect } from "react";
import Post from "../Post";
import { fetchGetData } from "../../api";

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
    <div>
      {posts ? (
        <div id="posts-container">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
