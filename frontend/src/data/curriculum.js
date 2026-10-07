export const curriculum = {
  6: {
    Mathematics: ["Numbers", "Fractions", "Basic Geometry", "Data Handling"],
    Science: ["Food", "Materials", "Living Things", "Motion"],
    English: ["Reading Skills", "Grammar Basics", "Writing Practice", "Poetry"],
    "Social Science": ["Early History", "Maps", "Community Life", "Resources"]
  },
  7: {
    Mathematics: ["Integers", "Algebraic Expressions", "Lines and Angles", "Perimeter and Area"],
    Science: ["Nutrition in Plants", "Heat", "Acids and Bases", "Weather"],
    English: ["Comprehension", "Tenses", "Paragraph Writing", "Poems"],
    "Social Science": ["Medieval India", "Environment", "Democracy", "Markets"]
  },
  8: {
    Mathematics: ["Rational Numbers", "Linear Equations", "Mensuration", "Graphs"],
    Science: ["Crop Production", "Microorganisms", "Force and Pressure", "Light"],
    English: ["Reading", "Voice", "Essay Writing", "Literature"],
    "Social Science": ["Modern History", "Resources", "Constitution", "Agriculture"]
  },
  9: {
    Mathematics: ["Number Systems", "Polynomials", "Coordinate Geometry", "Statistics"],
    Science: ["Matter in Our Surroundings", "The Fundamental Unit of Life", "Motion", "Atoms and Molecules"],
    English: ["Prose", "Poetry", "Grammar", "Writing Skills"],
    "Social Science": ["French Revolution", "India: Size and Location", "Democratic Politics", "Economics"]
  },
  10: {
    Mathematics: ["Real Numbers", "Polynomials", "Pair of Linear Equations", "Triangles"],
    Science: ["Life Processes", "Acids, Bases and Salts", "Electricity", "Our Environment"],
    English: ["Reading Comprehension", "Grammar", "Analytical Paragraph", "Literature"],
    "Social Science": ["Nationalism in India", "Resources and Development", "Power Sharing", "Development"]
  }
};

export function getClasses() {
  return Object.keys(curriculum);
}

export function getSubjects(classLevel) {
  return Object.keys(curriculum[classLevel] || curriculum["6"]);
}

export function getChapters(classLevel, subject) {
  return curriculum[classLevel]?.[subject] || [];
}

export const defaultSelection = {
  classLevel: "10",
  subject: "Science",
  chapter: "Life Processes"
};
