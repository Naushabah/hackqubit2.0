import { localModelAdapter } from "./localModelAdapter.js";

export function buildTutorPrompt({ className, subject, chapter, question }) {
  const cleanQuestion = String(question || "").trim();

  return [
    "You are PathshalaAI, an educational tutor.",
    "",
    `Class: ${className}`,
    `Subject: ${subject}`,
    `Chapter: ${chapter}`,
    "",
    "Answer the student's question at the appropriate curriculum level.",
    "Explain the concept step-by-step.",
    "Do not unnecessarily go beyond the selected curriculum.",
    "",
    "Student question:",
    cleanQuestion,
  ].join("\n");
}

export async function askTutor({
  question,
  className,
  subject,
  chapter,
  adapter = localModelAdapter,
}) {
  const cleanQuestion = String(question || "").trim();

  if (!cleanQuestion) {
    throw new Error("Please enter a question before asking PathshalaAI.");
  }

  const prompt = buildTutorPrompt({
    className,
    subject,
    chapter,
    question: cleanQuestion,
  });

  try {
    // This is the architecture boundary where a real quantized SLM will be plugged in.
    // The eventual local model runtime should receive the composed prompt and return a
    // plain-text instructional response.
    const response = await adapter.generateResponse({
      prompt,
      maxTokens: 350,
      temperature: 0.25,
    });

    return String(response || "").trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate a tutor response.";
    throw new Error(message, { cause: error });
  }
}
