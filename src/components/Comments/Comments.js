import "./Comments.css";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "../CommentForm";

const Comments = ({ postComments, user }) => {
  const [comments, setComments] = useState(postComments);

  const handleNewComment = (comment) => {
    if (comment.parent) {
      let newComments = comments.slice();
      const parent = newComments.findIndex((c) => c._id === comment.parent);
      newComments[parent].replies.push(comment);
      setComments(newComments);
    } else {
      setComments((comments) => [...comments, comment]);
    }
  };

  const renderAllComments = (comments, layer) => {
    return comments.map((comment) => (
      <Comment
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
        <CommentForm handleNewComment={handleNewComment} user={user} />
      </div>
      <div id="comments-index">
        {comments ? renderAllComments(comments, 1) : null}
      </div>
    </div>
  );
};

export default Comments;
