export const notes = [
  {
    classLevel: "10",
    subject: "Science",
    chapter: "Life Processes",
    title: "Life Processes",
    introduction:
      "Life processes are the basic activities that keep living organisms alive, such as nutrition, respiration, transportation, and excretion.",
    importantConcepts: ["Nutrition", "Respiration", "Transportation", "Excretion"],
    keyPoints: [
      "Autotrophs make their own food, while heterotrophs depend on other organisms.",
      "Respiration releases energy from food so cells can work.",
      "Transportation moves useful substances inside the body.",
      "Excretion removes harmful metabolic wastes."
    ],
    definitions: [
      { term: "Photosynthesis", meaning: "The process by which green plants make food using sunlight, carbon dioxide, and water." },
      { term: "Respiration", meaning: "The process of breaking down food to release energy." },
      { term: "Excretion", meaning: "The removal of waste products from the body." }
    ],
    quickRevision: [
      "Plants use chlorophyll for photosynthesis.",
      "Human digestion starts in the mouth.",
      "Blood transports oxygen, nutrients, and wastes.",
      "Kidneys help remove nitrogenous wastes."
    ]
  },
  {
    classLevel: "10",
    subject: "Mathematics",
    chapter: "Real Numbers",
    title: "Real Numbers",
    introduction:
      "Real numbers include rational and irrational numbers. This chapter builds number sense using factors, multiples, and decimal forms.",
    importantConcepts: ["Euclid's division lemma", "HCF", "LCM", "Irrational numbers"],
    keyPoints: [
      "Every composite number can be expressed as a product of primes.",
      "HCF is based on common factors; LCM is based on common multiples.",
      "A rational number can be written as p/q where q is not zero.",
      "Some decimal expansions are non-terminating and non-repeating."
    ],
    definitions: [
      { term: "HCF", meaning: "The greatest number that divides two or more numbers exactly." },
      { term: "LCM", meaning: "The smallest number that is a common multiple of two or more numbers." },
      { term: "Irrational number", meaning: "A number that cannot be written as p/q for integers p and q where q is not zero." }
    ],
    quickRevision: [
      "Use prime factorization for HCF and LCM.",
      "HCF x LCM equals the product of two numbers.",
      "Recurring decimals are rational.",
      "Non-repeating, non-terminating decimals are irrational."
    ]
  },
  {
    classLevel: "9",
    subject: "Science",
    chapter: "Matter in Our Surroundings",
    title: "Matter in Our Surroundings",
    introduction:
      "Matter is anything that has mass and occupies space. It exists mainly as solids, liquids, and gases in everyday life.",
    importantConcepts: ["States of matter", "Diffusion", "Change of state", "Evaporation"],
    keyPoints: [
      "Particles of matter have spaces between them.",
      "Particles are continuously moving.",
      "Heating can change the state of matter.",
      "Evaporation causes cooling."
    ],
    definitions: [
      { term: "Diffusion", meaning: "The mixing of particles of two substances on their own." },
      { term: "Melting point", meaning: "The temperature at which a solid changes into a liquid." },
      { term: "Evaporation", meaning: "The change of a liquid into vapour from its surface." }
    ],
    quickRevision: [
      "Solids have fixed shape and volume.",
      "Liquids have fixed volume but not fixed shape.",
      "Gases are highly compressible.",
      "Higher temperature increases particle movement."
    ]
  },
  {
    classLevel: "8",
    subject: "Science",
    chapter: "Force and Pressure",
    title: "Force and Pressure",
    introduction:
      "A force is a push or pull. Pressure explains how force is spread over an area.",
    importantConcepts: ["Force", "Contact force", "Non-contact force", "Pressure"],
    keyPoints: [
      "Force can change the speed, direction, or shape of an object.",
      "Pressure increases when the same force acts on a smaller area.",
      "Liquids and gases exert pressure.",
      "Atmospheric pressure is due to air around Earth."
    ],
    definitions: [
      { term: "Force", meaning: "A push or pull acting on an object." },
      { term: "Pressure", meaning: "Force acting per unit area." },
      { term: "Friction", meaning: "A force that opposes motion between surfaces in contact." }
    ],
    quickRevision: [
      "More force usually means more pressure.",
      "Sharp tools work better because force acts on a small area.",
      "Magnets can apply non-contact force.",
      "Air pressure acts in all directions."
    ]
  }
];

export function findNote(selection) {
  return notes.find(
    (note) =>
      note.classLevel === selection.classLevel &&
      note.subject === selection.subject &&
      note.chapter === selection.chapter
  );
}
