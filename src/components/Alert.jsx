// Small helper so every page shows errors and confirmations the same way.
export default function Alert({ error, success }) {
  if (error) return <p className="alert error">{error}</p>;
  if (success) return <p className="alert success">{success}</p>;
  return null;
}
