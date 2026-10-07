export default function NoteCard({ title, children }) {
  return (
    <section className="note-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
