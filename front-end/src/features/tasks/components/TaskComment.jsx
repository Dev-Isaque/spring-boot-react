import { useComments } from "../hooks/useComments";
import { CommentList } from "./comment/CommentList";
import { CommentForm } from "./comment/CommentForm";

export function TaskComment({ taskId }) {
  const { comments, addComment, loading, error } = useComments(taskId);

  return (
    <div className="comment-section">
      <h5 className="mb-3">Comentários</h5>

      {error && <p className="text-danger">{error}</p>}

      <div className="comment-chat-container">
        <CommentList comments={comments} />
      </div>

      <CommentForm onSubmit={addComment} loading={loading} />
    </div>
  );
}
