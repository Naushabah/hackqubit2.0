import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 55515;

app.use(cors());
app.use(express.json());

const curriculumExamples = {
  photosynthesis: {
    classLevel: "Class 7",
    subject: "Science",
    chapter: "Plants and Food",
    answer:
      "Photosynthesis is the process plants use to make food. They take in sunlight, water from the soil, and carbon dioxide from the air, and then they make glucose and release oxygen. In simple terms, plants use sunlight to turn raw materials into their own food."
  },
  fractions: {
    classLevel: "Class 6",
    subject: "Mathematics",
    chapter: "Fractions",
    answer:
      "A fraction shows a part of a whole. The top number is the numerator, which tells how many parts you have, and the bottom number is the denominator, which tells how many equal parts the whole is divided into. For example, 3/4 means three out of four equal parts."
  },
  force: {
    classLevel: "Class 8",
    subject: "Science",
    chapter: "Force and Pressure",
    answer:
      "Force is a push or a pull that can change the motion of an object. It can make something start moving, stop moving, or change direction. A stronger force can create a larger change in motion, while friction is a force that resists movement between surfaces."
  }
};

function generateTutorAnswer({ question, classLevel, subject, chapter }) {
  const cleanQuestion = String(question || "").trim();

  if (!cleanQuestion) {
    throw new Error("Question is required.");
  }

  const normalized = cleanQuestion.toLowerCase();

  const topic = Object.keys(curriculumExamples).find((key) => normalized.includes(key));

  if (topic) {
    return `${curriculumExamples[topic].answer}\n\nSelected context: ${classLevel}, ${subject}, ${chapter}.`;
  }

  return [
    `Here is a simple explanation for ${subject} in ${chapter}:`,
    "Start by identifying the key idea in the question. Then look at the rule, formula, or process related to it. Try to explain it in everyday words before using technical terms.",
    "When you are learning, it helps to connect the concept to a real-life example so the idea becomes easier to remember.",
    `\nSelected context: ${classLevel}, ${subject}, ${chapter}.`
  ].join("\n");
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "PathshalaAI backend",
    message: "Backend is running successfully.",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/tutor/ask", (req, res) => {
  const { question, classLevel, subject, chapter } = req.body || {};

  if (!question || !classLevel || !subject || !chapter) {
    return res.status(400).json({
      error: "Missing required fields: question, classLevel, subject, and chapter are required."
    });
  }

  try {
    const answer = generateTutorAnswer({ question, classLevel, subject, chapter });

    return res.json({
      answer,
      classLevel,
      subject,
      chapter,
      source: "PathshalaAI backend"
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message || "Unable to generate answer."
    });
  }
});

app.listen(PORT, () => {
  console.log(`PathshalaAI backend running on http://localhost:${PORT}`);
});
