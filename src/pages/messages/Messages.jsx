import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMessages } from "../../services/messageService.js";
import MessageCard from "../../components/MessageCard.jsx";
import Alert from "../../components/Alert.jsx";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    let active = true;

    getMessages()
      .then((response) => {
        if (!active) return;
        // Accept either { data: [...] } or a plain array.
        const list = Array.isArray(response) ? response : response?.data || [];
        setMessages(list);
      })
      .catch((err) => {
        if (!active) return;
        if (err.status === 401) setNeedsLogin(true);
        else setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <p>Loading your messages…</p>;

  if (needsLogin) {
    return (
      <section>
        <h1>Inbox</h1>
        <p>
          Your session has ended. <Link to="/login">Log in</Link> to read your
          messages.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>Inbox</h1>
      <Alert error={error} />
      {messages.length === 0 && !error ? (
        <p className="muted">
          Nothing here yet. Share your profile link so people can write to you.
        </p>
      ) : (
        messages.map((message) => (
          <MessageCard key={message._id || message.id} message={message} />
        ))
      )}
    </section>
  );
}
