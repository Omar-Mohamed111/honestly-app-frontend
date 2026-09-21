import { useState } from "react";
import { sendMessage } from "../../services/messageService.js";
import Alert from "../../components/Alert.jsx";

export default function SendMessage({ receiver }) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Only receiver, content and isAnonymous go to the backend.
      // The sender is taken from the login cookie on the server.
      await sendMessage({ receiver, content, isAnonymous });
      setSuccess("Message sent.");
      setContent("");
    } catch (err) {
      setError(
        err.status === 401 ? "Log in first to send a message." : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Alert error={error} success={success} />
      <label>
        Message
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Say what you actually think."
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
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
