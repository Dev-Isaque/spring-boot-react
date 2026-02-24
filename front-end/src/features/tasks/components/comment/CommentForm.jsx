import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export function CommentForm({ onSubmit, loading }) {
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    await onSubmit({ content });
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        className="comment-textarea"
        placeholder="Escreva um comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit" className="comment-button" disabled={loading}>
        {loading ? "Enviando..." : <SendHorizontal className="w-4 h-4" />}
      </button>
    </form>
  );
}
