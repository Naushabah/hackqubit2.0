export default function QuizCard({ question, selectedAnswer, onAnswer }) {
  return (
    <article className="quiz-card">
      <p className="quiz-meta">
        {question.subject} · Class {question.classLevel} · {question.difficulty}
      </p>
      <h2>{question.question}</h2>

      <div className="option-list">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={`option-button${selectedAnswer === option ? " selected" : ""}`}
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="explanation-box">
          <strong>{selectedAnswer === question.answer ? "Correct" : "Demo explanation"}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
}
