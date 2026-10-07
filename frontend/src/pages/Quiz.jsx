import { useMemo, useState } from "react";
import CurriculumSelector from "../components/CurriculumSelector.jsx";
import QuizCard from "../components/QuizCard.jsx";
import { defaultSelection } from "../data/curriculum.js";
import { getQuizQuestions } from "../data/quizData.js";

export default function Quiz() {
  const [selection, setSelection] = useState({ ...defaultSelection, difficulty: "Easy" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = useMemo(() => getQuizQuestions(selection), [selection]);
  const currentQuestion = questions[currentIndex] || questions[0];
  const selectedAnswer = answers[currentQuestion.id];
  const score = questions.reduce(
    (total, question) => total + (answers[question.id] === question.answer ? 1 : 0),
    0
  );

  function updateSelection(nextSelection) {
    setSelection(nextSelection);
    setCurrentIndex(0);
    setAnswers({});
  }

  function tryAgain() {
    setCurrentIndex(0);
    setAnswers({});
  }

  return (
    <section className="quiz-page section" aria-labelledby="quiz-title">
      <div className="section-heading">
        <p className="eyebrow">Quiz</p>
        <h1 id="quiz-title">Practice with quick questions</h1>
        <p>All questions are local demo content for now. No API is used.</p>
      </div>

      <div className="quiz-layout">
        <aside className="control-card">
          <h2>Quiz setup</h2>
          <CurriculumSelector value={selection} onChange={updateSelection} showDifficulty />
          <div className="score-box">
            <span>Score</span>
            <strong>
              {score}/{questions.length}
            </strong>
          </div>
        </aside>

        <div className="quiz-main">
          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswer={(answer) => setAnswers((current) => ({ ...current, [currentQuestion.id]: answer }))}
          />

          <div className="quiz-actions">
            <button
              className="button secondary-button"
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((index) => index - 1)}
            >
              Previous
            </button>
            <button
              className="button primary-button"
              type="button"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((index) => index + 1)}
            >
              Next
            </button>
            <button className="button ghost-button" type="button" onClick={tryAgain}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
