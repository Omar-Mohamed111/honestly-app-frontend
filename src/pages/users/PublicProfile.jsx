import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/userService.js";
import Alert from "../../components/Alert.jsx";
import SendMessage from "../messages/SendMessage.jsx";

export default function PublicProfile() {
  const { username } = useParams(); // comes from the /u/:username route
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getUser(username)
      .then((response) => {
        if (active) setProfile(response.data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [username]);

  if (loading) return <p>Loading profile…</p>;
  if (error) return <Alert error={error} />;
  if (!profile) return <p>No profile found for @{username}.</p>;

  // The message endpoint wants the receiver's id.
  // We use whichever id field the backend sends back with the profile.
  const receiverId = profile._id || profile.id || profile.username;

  return (
    <section>
      <div className="card">
        <div className="row">
          {profile.picture && (
            <img className="avatar" src={profile.picture} alt="" />
          )}
          <div>
            <h1>{profile.name}</h1>
            <p className="muted">@{profile.username}</p>
          </div>
        </div>
      </div>

      <h2>Send {profile.name} a message</h2>
      <SendMessage receiver={receiverId} />
    </section>
  );
}
