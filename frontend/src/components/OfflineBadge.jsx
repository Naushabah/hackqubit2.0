export default function OfflineBadge({ compact = false }) {
  return (
    <span className={`status-pill${compact ? " compact" : ""}`} aria-label="Offline mode is active">
      <span className="status-dot" aria-hidden="true"></span>
      Offline Mode
    </span>
  );
}
