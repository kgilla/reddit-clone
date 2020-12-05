import "./Sub.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import PostPreview from "../PostPreview";

const Sub = () => {
  const { name } = useParams();
  const [subData, setSubData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `http://localhost:3000/api/s/${name}`;
        const response = await fetch(URL);
        const data = await response.json();
        setSubData(data.sub);
        console.log(data.sub);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sub-container">
      {subData ? (
        <div>
          <header id="sub-header">
            <div className="colored-bar"></div>
            <h1 className="sub-heading">{subData.name}</h1>
          </header>
          <main className="sub-page">
            <div id="posts-container">
              {subData.posts.map((post) => (
                <PostPreview key={post._id} post={post} />
              ))}
            </div>
            <div className="sidebar"></div>
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default Sub;
