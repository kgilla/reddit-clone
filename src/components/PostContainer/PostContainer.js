import "./PostContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetData } from "../../api";

import Comments from "../Comments";
import Post from "../Post";
import Sidebar from "../Sidebar";

const PostContainer = ({ user }) => {
  const { subID, postID } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        `http://localhost:3000/api/s/${subID}/posts/${postID}`
      );
      console.log(response.post);
      setPost(response.post);
    };
    fetchData();
  }, []);

  return (
    <div>
      {post ? (
        <div id="post-container">
          <div id="post-container-left">
            <Post post={post} user={user} />
            <Comments postComments={post.comments} user={user} />
          </div>
          <Sidebar sub={post.sub} />
        </div>
      ) : null}
    </div>
  );
};

export default PostContainer;
