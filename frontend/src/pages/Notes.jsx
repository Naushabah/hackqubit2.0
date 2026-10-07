import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurriculumSelector from "../components/CurriculumSelector.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { defaultSelection } from "../data/curriculum.js";
import { findNote } from "../data/notes.js";

export default function Notes() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(defaultSelection);
  const note = useMemo(() => findNote(selection), [selection]);

  return (
    <section className="notes-page section" aria-labelledby="notes-title">
      <div className="section-heading">
        <p className="eyebrow">Notes</p>
        <h1 id="notes-title">Curriculum Notes</h1>
        <p>Sample curriculum-aligned notes are stored locally until verified curriculum material is added.</p>
      </div>

      <div className="notes-layout">
        <aside className="control-card">
          <h2>Choose notes</h2>
          <CurriculumSelector value={selection} onChange={setSelection} />
          <button
            className="button primary-button full-button"
            type="button"
            onClick={() => navigate("/tutor", { state: { selection } })}
          >
            Ask Tutor
          </button>
        </aside>

        {note ? (
          <article className="notes-content">
            <h1>{note.title}</h1>
            <NoteCard title="Introduction">
              <p>{note.introduction}</p>
            </NoteCard>

            <NoteCard title="Important Concepts">
              <ul>
                {note.importantConcepts.map((concept) => (
                  <li key={concept}>{concept}</li>
                ))}
              </ul>
            </NoteCard>

            <NoteCard title="Key Points">
              <ul>
                {note.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </NoteCard>

            <NoteCard title="Important Definitions">
              <div className="definition-grid">
                {note.definitions.map((definition) => (
                  <div className="definition-card" key={definition.term}>
                    <strong>{definition.term}</strong>
                    <p>{definition.meaning}</p>
                  </div>
                ))}
              </div>
            </NoteCard>

            <NoteCard title="Quick Revision">
              <ul>
                {note.quickRevision.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </NoteCard>
          </article>
        ) : (
          <div className="empty-panel">
            <h2>Sample notes coming soon</h2>
            <p>
              This chapter exists in the expandable curriculum structure, but detailed sample notes have not
              been added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
