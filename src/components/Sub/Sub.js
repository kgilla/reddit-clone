import "./Sub.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGetData } from "../../api";
import Post from "../Post";
import Sidebar from "../Sidebar";
import SubHeader from "../SubHeader";
import Loader from "../Loader";

const Sub = () => {
  const { subID } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchGetData(
        `http://localhost:3000/api/s/${subID}`
      );
      setData({ sub: response.sub, posts: response.posts });
      setIsLoading(false);
    };
    fetchData();
  }, [subID]);

  return isLoading ? (
    <Loader />
  ) : data ? (
    <div className="sub-container">
      <SubHeader subData={data.sub} />
      <main className="sub-page">
        <div className="posts-container">
          {data.posts.length > 0 ? (
            data.posts.map((post) => (
              <Post key={post._id} post={post} link="true" />
            ))
          ) : (
            <div className="empty-sub">
              <h1>No Posts Yet!</h1> <div>Picture</div>
              <Link to="/submit">Create Post</Link>
            </div>
          )}
        </div>
        <Sidebar sub={data.sub} />
      </main>
    </div>
  ) : null;
};

export default Sub;
