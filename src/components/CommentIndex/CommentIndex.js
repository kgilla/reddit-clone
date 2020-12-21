import "./CommentIndex.css";
import Comment from "../Comment";
import CommentForm from "../CommentForm";

const CommentIndex = ({ comments, post, refreshPost, changeMessage }) => {
  const renderAllComments = (comments, layer) => {
    return comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        post={post}
        refreshPost={refreshPost}
        layer={layer}
        changeMessage={changeMessage}
      >
        {comment.replies ? renderAllComments(comment.replies, layer + 1) : null}
      </Comment>
    ));
  };

  return (
    <div id="comments-container">
      <h2>Leave A Comment</h2>
      <div>
        <CommentForm
          post={post}
          refreshPost={refreshPost}
          changeMessage={changeMessage}
        />
      </div>
      <div id="comments-index">
        {comments ? renderAllComments(comments, 1) : null}
      </div>
    </div>
  );
};

export default CommentIndex;
