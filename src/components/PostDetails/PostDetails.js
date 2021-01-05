import "./PostDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetData } from "../../api";

import CommentIndex from "../CommentIndex";
import Post from "../Post";
import Sidebar from "../Sidebar";
import Loader from "../Loader";

const PostDetails = ({ changeMessage }) => {
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
  }, [postID, subID]);

  const refreshPost = async () => {
    setIsLoading(true);
    const response = await fetchGetData(
      `http://localhost:3000/api/s/${subID}/posts/${postID}`
    );
    setPost(response.post);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : post ? (
        <div className="post-details-container">
          <div className="post-details">
            <Post post={post} />
            <CommentIndex
              comments={post.comments}
              post={post}
              refreshPost={refreshPost}
              changeMessage={changeMessage}
            />
          </div>
          <Sidebar sub={post.sub} />
        </div>
      ) : null}
    </div>
  );
};

export default PostDetails;
