const questions = [
  {
    text: "Which HTML element is used to define the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answerIndex: 2
  },
  {
    text: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answerIndex: 2
  },
  {
    text: "Which JavaScript method is used to select an element by its id?",
    options: ["getElementById()", "queryAll()", "selectId()", "getById()"],
    answerIndex: 0
  },
  {
    text: "Which attribute is used to provide alternative text for an image?",
    options: ["title", "alt", "desc", "caption"],
    answerIndex: 1
  },
  {
    text: "Which tag is semantic for page navigation?",
    options: ["<nav>", "<div>", "<section>", "<span>"],
    answerIndex: 0
  }
];

let currentIndex = 0;
let score = 0;
const userAnswers = new Array(questions.length).fill(null);

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result-section");
const quizSection = document.getElementById("quiz-section");
const scoreText = document.getElementById("score-text");
const feedbackText = document.getElementById("feedback-text");
const restartBtn = document.getElementById("restart-btn");

function renderQuestion(index){
  const q = questions[index];
  questionText.textContent = `Q${index + 1}. ${q.text}`;
  optionsContainer.innerHTML = "";
  q.options.forEach((opt, i) => {
    const id = `opt-${index}-${i}`;
    const label = document.createElement("label");
    label.className = "option";
    label.setAttribute("for", id);
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.id = id;
    input.value = i;
    input.checked = userAnswers[index] === i;
    input.addEventListener("change", () => {
      userAnswers[index] = i;
      nextBtn.disabled = false;
    });
    const span = document.createElement("span");
    span.textContent = opt;
    label.appendChild(input);
    label.appendChild(span);
    optionsContainer.appendChild(label);
  });

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? "Submit" : "Next";
  nextBtn.disabled = userAnswers[index] === null;
}

function showResult(){
  score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answerIndex) score++;
  });
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
  const percent = (score / questions.length) * 100;
  if (percent >= 80) {
    feedbackText.textContent = "Excellent — great job!";
  } else if (percent >= 50) {
    feedbackText.textContent = "Good — you did well!";
  } else {
    feedbackText.textContent = "Try Again — keep practicing!";
  }
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  for (let i = 0; i < userAnswers.length; i++) userAnswers[i] = null;
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  renderQuestion(currentIndex);
});

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion(currentIndex);
});