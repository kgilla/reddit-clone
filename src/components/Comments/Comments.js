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

  return (
    <div>
      <div>
        <CommentForm handleNewComment={handleNewComment} user={user} />
      </div>
      <div>
        {comments
          ? comments.map((comment) => (
              <Comment
                comment={comment}
                user={user}
                handleNewComment={handleNewComment}
              >
                {comment.replies
                  ? comment.replies.map((reply) => (
                      <Comment comment={reply} user={user} reply="true" />
                    ))
                  : null}
              </Comment>
            ))
          : null}
      </div>
    </div>
  );
};

export default Comments;
