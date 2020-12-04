import "./Main.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import Post from "../Post";

const Main = () => {
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
    <div>
      {subData ? (
        <div>
          <h1>{subData.name}</h1>
          <h2>{subData.description}</h2>
          <div id="posts-container">
            {subData.posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
