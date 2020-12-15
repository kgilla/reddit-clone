import "./Sub.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetData } from "../../api";
import Post from "../Post";
import Sidebar from "../Sidebar";
import SubHeader from "../SubHeader";
import Loader from "../Loader";

const Sub = ({ user, updateUser, token }) => {
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

  return (
    <div className="sub-container">
      {isLoading ? (
        <Loader />
      ) : subData ? (
        <div>
          <SubHeader
            subData={subData}
            user={user}
            updateUser={updateUser}
            token={token}
          />
          <main className="sub-page">
            <div id="posts-container">
              {subData.posts.map((post) => (
                <Post key={post._id} post={post} link="true" />
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
