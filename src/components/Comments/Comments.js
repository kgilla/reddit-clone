import Comment from "./Comment";
import CommentForm from "../CommentForm";

const Comments = ({ comments, user }) => {
  const handleNewComment = (comment) => {
    console.log(comment);
    comments = [...comments, comment];
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
