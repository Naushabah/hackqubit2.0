export default function ProgressCard({ label, value, helper }) {
  return (
    <article className="progress-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{helper}</span>
    </article>
  );
}
