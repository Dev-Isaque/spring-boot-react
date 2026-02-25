import { useComments } from "../hooks/useComments";
import { CommentList } from "./comment/CommentList";
import { CommentForm } from "./comment/CommentForm";
import { MessagesSquare } from "lucide-react";

export function TaskComment({ taskId }) {
  const { comments, addComment, loading, error } = useComments(taskId);

  return (
    <div className="comment-section">
      <div className="d-flex align-items-center gap-2 mb-4">
        <MessagesSquare />
        <span className="fw-semibold">Comentários</span>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="comment-chat-container">
        <CommentList comments={comments} />
      </div>

      <CommentForm onSubmit={addComment} loading={loading} />
    </div>
  );
}
