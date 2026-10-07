import { localModelAdapter } from "./localModelAdapter.js";
import knowledgeBase from "../data/knowledgeBase.js";

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function findCurriculumAnswer({ question, className, subject, chapter }) {
  const normalizedQuestion = normalize(question);
  const normalizedSubject = normalize(subject);
  const normalizedChapter = normalize(chapter);
  const normalizedClass = normalize(className);

  return knowledgeBase.find((entry) => {
    const sameClass = normalize(entry.className) === normalizedClass;
    const sameSubject = normalize(entry.subject) === normalizedSubject;
    const sameChapter = normalize(entry.chapter) === normalizedChapter;
    const keywordMatch = entry.keywords.some((keyword) => normalizedQuestion.includes(normalize(keyword)));

    return sameClass && sameSubject && sameChapter && keywordMatch;
  });
}

function buildLocalDemoAnswer({ question, className, subject, chapter }) {
  const match = findCurriculumAnswer({ question, className, subject, chapter });

  if (match) {
    const formulaText = match.formula ? `\n\nFormula to remember: ${match.formula}` : "";

    return [
      "Demo local curriculum response:",
      `${match.definition}${formulaText}`,
      "",
      `This answer is limited to Class ${className}, ${subject}, chapter: ${chapter}.`,
      "The fine-tuned offline SLM is not connected yet."
    ].join("\n");
  }

  return [
    "Demo local curriculum response:",
    "I do not have a detailed local answer for this exact question yet.",
    "",
    `Selected context: Class ${className}, ${subject}, chapter: ${chapter}.`,
    "Once the QLoRA fine-tuned on-device SLM is connected, PathshalaAI will explain this step by step using the selected curriculum."
  ].join("\n");
}

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

  try {
    const response = await fetch("/api/tutor/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: cleanQuestion,
        classLevel: className,
        subject,
        chapter,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return String(data.answer || "").trim();
    }

    throw new Error("Backend response was not successful.");
  } catch (error) {
    const prompt = buildTutorPrompt({
      className,
      subject,
      chapter,
      question: cleanQuestion,
    });

    try {
      const response = await adapter.generateResponse({
        prompt,
        maxTokens: 350,
        temperature: 0.25,
      });

      return String(response || "").trim();
    } catch (fallbackError) {
      return buildLocalDemoAnswer({
        question: cleanQuestion,
        className,
        subject,
        chapter,
      });
    }
  }
}
