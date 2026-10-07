import { Link } from "react-router-dom";
import { pipelineSteps, trainingMilestones } from "../data/modelPipeline.js";

export default function AIRoadmap() {
  return (
    <section className="ai-roadmap-page section" aria-labelledby="ai-roadmap-title">
      <div className="section-heading">
        <p className="eyebrow">AI Roadmap</p>
        <h1 id="ai-roadmap-title">PathshalaAI Model Pipeline</h1>
        <p>
          This page shows how the offline tutor will move from local curriculum data to a
          fine-tuned small language model. The current app still uses local demo logic only.
        </p>
      </div>

      <div className="pipeline-hero">
        <div>
          <h2>Small pretrained SLM + Class 6-10 dataset</h2>
          <p>
            The frontend is now prepared for a local model bridge, while the AI folders hold the
            next steps for dataset creation, QLoRA training, quantization, and evaluation.
          </p>
          <div className="hero-actions">
            <Link className="button primary-button" to="/tutor">
              Try Tutor
            </Link>
            <Link className="button secondary-button" to="/notes">
              View Notes
            </Link>
          </div>
        </div>
        <div className="pipeline-code" aria-label="AI pipeline summary">
          <span>Small pretrained SLM</span>
          <span>+ Class 6-10 curriculum dataset</span>
          <strong>↓ QLoRA</strong>
          <span>Fine-tuned SLM</span>
          <strong>↓</strong>
          <span>Better curriculum answers</span>
        </div>
      </div>

      <div className="pipeline-grid">
        {pipelineSteps.map((step, index) => (
          <article className="pipeline-card" key={step.title}>
            <span className="step-number">{index + 1}</span>
            <div>
              <p className="pipeline-status">{step.status}</p>
              <h2>{step.title}</h2>
              <p>{step.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="milestone-card">
        <h2>Implementation Checklist</h2>
        <ul>
          {trainingMilestones.map((milestone) => (
            <li key={milestone}>{milestone}</li>
          ))}
        </ul>
      </section>

      <section className="safety-note">
        <h2>No cloud AI added</h2>
        <p>
          The current frontend does not call OpenAI, Gemini, Groq, Claude, Hugging Face, or any
          online AI service. Real inference should be added later through the local on-device model
          bridge.
        </p>
      </section>
    </section>
  );
}
