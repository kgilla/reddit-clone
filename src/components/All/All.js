import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { baseUrl } from "../../config/const";
import Post from "../Post";
import Sidebar from "../Sidebar";
import Loader from "../Loader";

const All = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetchGetData(`${baseUrl}/api/s/home/posts/`);
        setPosts(response.posts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
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
              name: "All",
              description:
                "This is a collection of all the communities newest posts",
            }}
          />
        </main>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default All;
