const chapterOptions = {
  Mathematics: ["Numbers", "Fractions", "Algebra", "Geometry", "Data Handling"],
  Science: ["Food", "Materials", "Living Things", "Motion", "Electricity"],
  English: ["Reading", "Grammar", "Writing", "Poetry", "Speaking"],
  "Social Science": ["History", "Geography", "Civics", "Culture", "Resources"]
};

const startLearningBtn = document.getElementById("startLearningBtn");
const tutorSection = document.getElementById("tutor");
const classSelect = document.getElementById("classSelect");
const subjectSelect = document.getElementById("subjectSelect");
const chapterSelect = document.getElementById("chapterSelect");
const chatContext = document.getElementById("chatContext");
const chapterPill = document.getElementById("chapterPill");
const questionForm = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const messages = document.getElementById("messages");
const emptyState = document.getElementById("emptyState");

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function scrollToTutor() {
  tutorSection.scrollIntoView({ behavior: "smooth", block: "start" });
  questionInput.focus();
}

function updateChapters() {
  const subject = subjectSelect.value;
  const chapters = chapterOptions[subject];

  chapterSelect.innerHTML = "";

  chapters.forEach((chapter) => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    chapterSelect.appendChild(option);
  });

  updateTutorContext();
}

function updateTutorContext() {
  chatContext.textContent = `${classSelect.value} ${subjectSelect.value}`;
  chapterPill.textContent = `Chapter: ${chapterSelect.value}`;
}

function updateAskButton() {
  askButton.disabled = questionInput.value.trim() === "";
}

function removeEmptyState() {
  if (emptyState) {
    emptyState.remove();
  }

  messages.classList.remove("empty");
}

function createMessage(type, name, text, options = {}) {
  const message = document.createElement("article");
  message.className = `message ${type}-message`;

  if (options.loading) {
    message.classList.add("loading-message");
  }

  const meta = document.createElement("div");
  meta.className = "message-meta";

  const label = document.createElement("span");
  label.className = "message-name";
  label.textContent = name;

  const time = document.createElement("time");
  time.className = "message-time";
  time.dateTime = new Date().toISOString();
  time.textContent = formatTime(new Date());

  const paragraph = document.createElement("p");
  paragraph.className = "message-text";
  paragraph.textContent = text;

  meta.append(label, time);
  message.append(meta, paragraph);

  return message;
}

function addWelcomeMessage() {
  const welcome = createMessage(
    "tutor",
    "PathshalaAI",
    "Namaste! I am your offline AI tutor. Ask me anything from your selected class and subject."
  );

  messages.classList.remove("empty");
  messages.insertBefore(welcome, emptyState);
}

function addDemoResponse(question) {
  const loadingMessage = createMessage(
    "tutor",
    "PathshalaAI",
    "Preparing demo response",
    { loading: true }
  );

  messages.appendChild(loadingMessage);
  messages.scrollTop = messages.scrollHeight;

  window.setTimeout(() => {
    const context = `${classSelect.value}, ${subjectSelect.value}, ${chapterSelect.value}`;

    // FUTURE: Send question to the on-device quantized SLM here.
    // No cloud API should be used.
    loadingMessage.replaceWith(
      createMessage(
        "tutor",
        "Demo AI Response",
        `Demo response: I will explain this step by step once the local PathshalaAI model is connected. Current context: ${context}. Your question was: "${question}".`
      )
    );

    messages.scrollTop = messages.scrollHeight;
  }, 700);
}

function handleQuestionSubmit(event) {
  event.preventDefault();

  const question = questionInput.value.trim();

  if (!question) {
    questionInput.focus();
    return;
  }

  removeEmptyState();
  messages.appendChild(createMessage("user", "Student", question));
  questionInput.value = "";
  updateAskButton();
  messages.scrollTop = messages.scrollHeight;
  addDemoResponse(question);
}

startLearningBtn.addEventListener("click", scrollToTutor);
subjectSelect.addEventListener("change", updateChapters);
classSelect.addEventListener("change", updateTutorContext);
chapterSelect.addEventListener("change", updateTutorContext);
questionInput.addEventListener("input", updateAskButton);
questionForm.addEventListener("submit", handleQuestionSubmit);

updateChapters();
updateAskButton();
addWelcomeMessage();
