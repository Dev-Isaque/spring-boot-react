export function CommentList({ comments }) {
  if (!comments.length)
    return <p className="text-muted">Nenhum comentário ainda.</p>;

  return (
    <>
      {comments.map((comment, index) => (
        <div key={index} className="chat-message">
          <div className="chat-header">
            <span className="chat-author">{comment.authorName}</span>
            <span className="chat-date">
              {new Date(comment.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="chat-content">{comment.content}</div>
        </div>
      ))}
    </>
  );
}
