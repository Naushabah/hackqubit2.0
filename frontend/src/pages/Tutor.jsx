import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatMessage from "../components/ChatMessage.jsx";
import CurriculumSelector from "../components/CurriculumSelector.jsx";
import OfflineBadge from "../components/OfflineBadge.jsx";
import { defaultSelection } from "../data/curriculum.js";

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
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    makeMessage(
      "tutor",
      "PathshalaAI",
      "Namaste! I am your offline AI tutor. Ask me anything from your selected class and subject."
    )
  ]);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  function handleSubmit(event) {
    event.preventDefault();
    const cleanQuestion = question.trim();

    if (!cleanQuestion || isLoading) {
      return;
    }

    setMessages((current) => [...current, makeMessage("user", "Student", cleanQuestion)]);
    setQuestion("");
    setIsLoading(true);

    window.setTimeout(() => {
      // FUTURE: Connect this interface to the local on-device PathshalaAI model.
      setMessages((current) => [
        ...current,
        makeMessage(
          "tutor",
          "Demo AI Response",
          `Demo response: I will explain this step by step once the local PathshalaAI model is connected. Context: Class ${selection.classLevel}, ${selection.subject}, ${selection.chapter}.`
        )
      ]);
      setIsLoading(false);
    }, 700);
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
            <span className="chapter-pill">Chapter: {selection.chapter}</span>
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
                  <span className="message-time">Demo</span>
                </div>
                <p className="message-text">Preparing demo response</p>
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
