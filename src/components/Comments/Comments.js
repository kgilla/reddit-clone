import "./Comments.css";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "../CommentForm";

const Comments = ({ postComments, user, token }) => {
  const [comments, setComments] = useState(postComments);
  console.log(postComments);

  const handleNewComment = (comment) => {};

  const renderAllComments = (comments, layer) => {
    return comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        user={user}
        handleNewComment={handleNewComment}
        layer={layer}
      >
        {comment.replies ? renderAllComments(comment.replies, layer + 1) : null}
      </Comment>
    ));
  };

  return (
    <div id="comments-container">
      <div>
        <CommentForm
          handleNewComment={handleNewComment}
          user={user}
          token={token}
        />
      </div>
      <div id="comments-index">
        {comments ? renderAllComments(comments, 1) : null}
      </div>
    </div>
  );
};

export default Comments;
