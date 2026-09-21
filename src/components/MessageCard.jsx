import { useState } from "react";
import ReplyForm from "./ReplyForm.jsx";

// Works out who to show as the sender.
// If the message is anonymous we never show the sender, even if the
// backend happens to include it.
function senderLabel(message) {
  if (message.isAnonymous) return "Anonymous";
  const sender = message.sender;
  if (!sender) return "Unknown sender";
  if (typeof sender === "string") return "A user";
  return sender.name || sender.username || "A user";
}

// The reply is a new message sent back to whoever wrote this one.
// For anonymous messages the backend may hide the sender id, in which
// case there is nobody to reply to.
function senderId(message) {
  const sender = message.sender;
  if (!sender) return null;
  if (typeof sender === "string") return sender;
  return sender._id || sender.id || null;
}

export default function MessageCard({ message }) {
  const [showReply, setShowReply] = useState(false);

  const messageId = message._id || message.id;
  const receiver = senderId(message);

  return (
    <article className="card">
      <p className="muted">
        {senderLabel(message)}
        {message.createdAt
          ? " · " + new Date(message.createdAt).toLocaleString()
          : ""}
      </p>
      <p>{message.content}</p>

      {receiver ? (
        <button className="secondary" onClick={() => setShowReply(!showReply)}>
          {showReply ? "Cancel reply" : "Reply"}
        </button>
      ) : (
        <p className="muted">This sender is hidden, so there is no one to reply to.</p>
      )}

      {showReply && (
        <ReplyForm
          receiver={receiver}
          replyTo={messageId}
          onDone={() => setShowReply(false)}
        />
      )}
    </article>
  );
}
