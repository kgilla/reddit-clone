import "./Sub.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGetData } from "../../api";
import Post from "../Post";
import Sidebar from "../Sidebar";
import SubHeader from "../SubHeader";
import Loader from "../Loader";
import { Surprise } from "@styled-icons/fa-solid";
import { baseUrl } from "../../config/const";

const Sub = () => {
  const { subID } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchGetData(`${baseUrl}/api/s/${subID}`);
      setData({ sub: response.sub, posts: response.posts });
      setIsLoading(false);
    };
    fetchData();
  }, [subID]);

  const removePost = (id) => {
    const newPosts = data.posts.filter((post) => post._id !== id);
    setData({ ...data, posts: newPosts });
  };

  return isLoading ? (
    <Loader />
  ) : data ? (
    <div className="sub-container">
      <SubHeader subData={data.sub} />
      <main className="sub-page">
        <div className="posts-container">
          {data.posts.length > 0 ? (
            data.posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                link="true"
                handleRemove={removePost}
              />
            ))
          ) : (
            <div className="empty-sub">
              <h1>No Posts Yet!</h1>
              <Surprise className="empty-sub-icon" />
              <Link
                to={{ pathname: "/submit", state: { subID: data.sub._id } }}
                className="button-filled"
              >
                Create Post
              </Link>
            </div>
          )}
        </div>
        <Sidebar sub={data.sub} />
      </main>
    </div>
  ) : null;
};

export default Sub;
