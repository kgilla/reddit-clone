import "./Sub.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetData } from "../../api";
import PostPreview from "../PostPreview";
import Sidebar from "../Sidebar";

const Sub = () => {
  const { subID } = useParams();
  const [subData, setSubData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetData(`http://localhost:3000/api/s/${subID}`);
      console.log(data.sub);
      setSubData(data.sub);
    };
    fetchData();
  }, [subID]);

  return (
    <div className="sub-container">
      {subData ? (
        <div>
          <main className="sub-page">
            <div id="posts-container">
              {subData.posts.map((post) => (
                <PostPreview key={post._id} post={post} />
              ))}
            </div>
            <Sidebar sub={subData} />
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default Sub;
