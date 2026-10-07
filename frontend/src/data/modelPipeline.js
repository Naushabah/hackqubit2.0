export const pipelineSteps = [
  {
    title: "Small pretrained SLM",
    status: "Planned",
    detail:
      "Start with a compact open small language model that can eventually fit on low-cost Android hardware after quantization."
  },
  {
    title: "Class 6-10 curriculum dataset",
    status: "In progress",
    detail:
      "Collect curriculum-aligned notes, definitions, examples, quizzes, and question-answer pairs in the ai/dataset folder."
  },
  {
    title: "QLoRA fine-tuning",
    status: "Next phase",
    detail:
      "Fine-tune adapters with QLoRA so the model learns the PathshalaAI tutoring style without retraining the full model."
  },
  {
    title: "Fine-tuned SLM",
    status: "Future",
    detail:
      "Merge or load the trained adapter with the base model and evaluate whether answers stay within class, subject, and chapter."
  },
  {
    title: "Quantized offline model",
    status: "Future",
    detail:
      "Convert the final model to a mobile-friendly quantized format for local Android inference."
  },
  {
    title: "Better curriculum answers",
    status: "Frontend ready",
    detail:
      "The React Tutor page already has a local-model adapter boundary. No cloud AI API is used."
  }
];

export const trainingMilestones = [
  "Build verified sample data for Class 6-10 subjects.",
  "Convert notes and quiz content into instruction-response training rows.",
  "Run QLoRA experiments in ai/training when hardware is available.",
  "Evaluate curriculum alignment, safety, and answer quality.",
  "Quantize the selected model for offline Android use.",
  "Connect the React tutor to the local inference bridge."
];
