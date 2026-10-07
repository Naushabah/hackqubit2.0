import { getChapters, getClasses, getSubjects } from "../data/curriculum.js";

export default function CurriculumSelector({ value, onChange, showDifficulty = false }) {
  const classes = getClasses();
  const subjects = getSubjects(value.classLevel);
  const chapters = getChapters(value.classLevel, value.subject);

  function updateField(field, nextValue) {
    const next = { ...value, [field]: nextValue };

    if (field === "classLevel") {
      const nextSubject = getSubjects(nextValue)[0];
      next.subject = nextSubject;
      next.chapter = getChapters(nextValue, nextSubject)[0];
    }

    if (field === "subject") {
      next.chapter = getChapters(value.classLevel, nextValue)[0];
    }

    onChange(next);
  }

  return (
    <div className="selector-grid">
      <div className="field-group">
        <label htmlFor="classLevel">Class</label>
        <select
          id="classLevel"
          value={value.classLevel}
          onChange={(event) => updateField("classLevel", event.target.value)}
        >
          {classes.map((classLevel) => (
            <option key={classLevel} value={classLevel}>
              Class {classLevel}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          value={value.subject}
          onChange={(event) => updateField("subject", event.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="chapter">Chapter</label>
        <select
          id="chapter"
          value={value.chapter}
          onChange={(event) => updateField("chapter", event.target.value)}
        >
          {chapters.map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
      </div>

      {showDifficulty && (
        <div className="field-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={value.difficulty}
            onChange={(event) => updateField("difficulty", event.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      )}
    </div>
  );
}
