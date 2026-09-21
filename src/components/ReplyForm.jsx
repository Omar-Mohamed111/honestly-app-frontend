import { useState } from "react";
import { sendMessage } from "../services/messageService.js";
import Alert from "./Alert.jsx";

export default function ReplyForm({ receiver, replyTo, onDone }) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await sendMessage({ receiver, content, isAnonymous, replyTo });
      setSuccess("Reply sent.");
      setContent("");
      if (onDone) setTimeout(onDone, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Alert error={error} success={success} />
      <label>
        Your reply
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        Send anonymously
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send reply"}
      </button>
    </form>
  );
}
