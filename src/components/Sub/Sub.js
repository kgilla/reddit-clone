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
  const [subData, setSubData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchGetData(`http://localhost:3000/api/s/${subID}`);
      setSubData(data.sub);
      setIsLoading(false);
    };
    fetchData();
  }, [subID]);

  return isLoading ? (
    <Loader />
  ) : subData ? (
    <div className="sub-container">
      <SubHeader subData={subData} />
      <main className="sub-page">
        <div className="posts-container">
          {subData.posts.length > 0 ? (
            subData.posts.map((post) => (
              <Post key={post._id} post={post} link="true" />
            ))
          ) : (
            <div className="empty-sub">
              <h1>No Posts Yet!</h1> <div>Picture</div>
              <Link to="/submit">Create Post</Link>
            </div>
          )}
        </div>
        <Sidebar sub={subData} />
      </main>
    </div>
  ) : null;
};

export default Sub;
