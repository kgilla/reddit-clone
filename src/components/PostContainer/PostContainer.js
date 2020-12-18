import "./PostContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetData } from "../../api";

import Comments from "../CommentIndex";
import Post from "../Post";
import Sidebar from "../Sidebar";
import Loader from "../Loader";

const PostContainer = ({ user }) => {
  const { subID, postID } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchGetData(
        `http://localhost:3000/api/s/${subID}/posts/${postID}`
      );
      setPost(response.post);
      setIsLoading(false);
    };
    fetchData();
  }, [postID]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : post ? (
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
