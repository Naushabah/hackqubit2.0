export default function ChatMessage({ message }) {
  return (
    <article className={`message ${message.role === "user" ? "user-message" : "tutor-message"}`}>
      <div className="message-meta">
        <span className="message-name">{message.name}</span>
        <time className="message-time" dateTime={message.createdAt}>
          {message.time}
        </time>
      </div>
      <p className="message-text">{message.text}</p>
    </article>
  );
}
