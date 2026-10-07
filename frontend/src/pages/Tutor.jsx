import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatMessage from "../components/ChatMessage.jsx";
import CurriculumSelector from "../components/CurriculumSelector.jsx";
import OfflineBadge from "../components/OfflineBadge.jsx";
import { defaultSelection } from "../data/curriculum.js";
import { askTutor } from "../services/tutorAI.js";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function makeMessage(role, name, text) {
  const now = new Date();
  return {
    id: `${role}-${now.getTime()}-${Math.random().toString(16).slice(2)}`,
    role,
    name,
    text,
    createdAt: now.toISOString(),
    time: formatTime(now)
  };
}

export default function Tutor() {
  const location = useLocation();
  const initialSelection = location.state?.selection || defaultSelection;
  const [selection, setSelection] = useState(initialSelection);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("idle");
  const [messages, setMessages] = useState([
    makeMessage(
      "tutor",
      "PathshalaAI",
      "Namaste! I am your offline AI tutor. Ask me anything from your selected class and subject."
    )
  ]);
  const chatRef = useRef(null);
  const isLoading = status === "loading";

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanQuestion = question.trim();

    if (!cleanQuestion || isLoading) {
      return;
    }

    const studentQuestion = cleanQuestion;
    setMessages((current) => [...current, makeMessage("user", "Student", studentQuestion)]);
    setQuestion("");
    setStatus("loading");

    try {
      const response = await askTutor({
        question: studentQuestion,
        className: selection.classLevel,
        subject: selection.subject,
        chapter: selection.chapter,
      });

      setMessages((current) => [...current, makeMessage("tutor", "PathshalaAI", response)]);
      setStatus("success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to generate a response.";
      setMessages((current) => [...current, makeMessage("tutor", "PathshalaAI", errorMessage)]);
      setStatus("error");
    }
  }

  return (
    <section className="tutor-shell section" aria-labelledby="tutor-title">
      <div className="section-heading">
        <p className="eyebrow">Tutor</p>
        <h1 id="tutor-title">Ask PathshalaAI</h1>
        <p>Choose your class, subject, and chapter, then ask a question in the chat.</p>
      </div>

      <div className="tutor-layout">
        <aside className="control-card" aria-labelledby="controls-title">
          <div className="card-heading">
            <h2 id="controls-title">Learning setup</h2>
            <OfflineBadge compact />
          </div>

          <CurriculumSelector value={selection} onChange={setSelection} />

          <div className="curriculum-card">
            <strong>Curriculum Mode: ON</strong>
            <p>Answers are designed to stay within your selected class and subject.</p>
          </div>
        </aside>

        <section className="chat-card" aria-label="Tutor chat">
          <div className="chat-header">
            <div>
              <p className="chat-label">PathshalaAI Tutor</p>
              <h2>
                Class {selection.classLevel} {selection.subject}
              </h2>
            </div>
            <div className="chat-header-actions">
              <span className="engine-status">AI Engine: Local Demo + SLM Ready</span>
              <span className="chapter-pill">Chapter: {selection.chapter}</span>
            </div>
          </div>

          <div className="messages" ref={chatRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="empty-state">
                <h3>No questions yet</h3>
                <p>Start by asking something from your selected chapter.</p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <article className="message tutor-message loading-message">
                <div className="message-meta">
                  <span className="message-name">PathshalaAI</span>
                  <span className="message-time">Thinking</span>
                </div>
                <p className="message-text">PathshalaAI is thinking...</p>
              </article>
            )}
          </div>

          <form className="question-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="questionInput">
              Type your question
            </label>
            <input
              id="questionInput"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              type="text"
              placeholder="Ask a question..."
              autoComplete="off"
            />
            <button className="button ask-button" type="submit" disabled={!question.trim() || isLoading}>
              Ask
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
