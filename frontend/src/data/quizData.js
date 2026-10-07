export const quizQuestions = [
  {
    id: 1,
    classLevel: "10",
    subject: "Science",
    chapter: "Life Processes",
    difficulty: "Easy",
    question: "Which process helps green plants make their own food?",
    options: ["Respiration", "Photosynthesis", "Excretion", "Transportation"],
    answer: "Photosynthesis",
    explanation: "Photosynthesis uses sunlight, carbon dioxide, and water to prepare food in green plants."
  },
  {
    id: 2,
    classLevel: "10",
    subject: "Science",
    chapter: "Life Processes",
    difficulty: "Medium",
    question: "Which organ mainly removes nitrogenous wastes from human blood?",
    options: ["Heart", "Lungs", "Kidneys", "Stomach"],
    answer: "Kidneys",
    explanation: "Kidneys filter blood and remove nitrogenous wastes through urine."
  },
  {
    id: 3,
    classLevel: "10",
    subject: "Mathematics",
    chapter: "Real Numbers",
    difficulty: "Easy",
    question: "What is the HCF of 12 and 18?",
    options: ["2", "3", "6", "36"],
    answer: "6",
    explanation: "The common factors of 12 and 18 are 1, 2, 3, and 6. The highest is 6."
  },
  {
    id: 4,
    classLevel: "9",
    subject: "Science",
    chapter: "Matter in Our Surroundings",
    difficulty: "Easy",
    question: "Which state of matter is highly compressible?",
    options: ["Solid", "Liquid", "Gas", "Crystal"],
    answer: "Gas",
    explanation: "Gas particles have large spaces between them, so gases can be compressed easily."
  },
  {
    id: 5,
    classLevel: "8",
    subject: "Science",
    chapter: "Force and Pressure",
    difficulty: "Medium",
    question: "Pressure increases when force acts on a:",
    options: ["Larger area", "Smaller area", "Round object", "Still object"],
    answer: "Smaller area",
    explanation: "Pressure is force per unit area, so the same force creates more pressure on a smaller area."
  }
];

export function getQuizQuestions(selection) {
  const exactMatches = quizQuestions.filter(
    (question) =>
      question.classLevel === selection.classLevel &&
      question.subject === selection.subject &&
      question.chapter === selection.chapter &&
      question.difficulty === selection.difficulty
  );

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  const chapterMatches = quizQuestions.filter(
    (question) =>
      question.classLevel === selection.classLevel &&
      question.subject === selection.subject &&
      question.chapter === selection.chapter
  );

  return chapterMatches.length > 0 ? chapterMatches : quizQuestions;
}
