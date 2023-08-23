const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "How many bones are there in the human body?",
        answers: [
            {text: "406", correct: false},
            {text: "206", correct: true},
            {text: "216", correct: false},
            {text: "306", correct: false},
        ],
    },
    {
        question: "What does Na stand for on the periodic table?",
        answers: [
            {text: "Potassium", correct: false},
            {text: "Sodium", correct: true},
            {text: "Phosphorus", correct: false},
            {text: "Silver", correct: false},
        ],
    },
    {
        question: "Which planet is closest to earth?",
        answers: [
            {text: "Saturn", correct: false},
            {text: "Mars", correct: false},
            {text: "Venus", correct: true},
            {text: "Uranus", correct: false},
        ],
    },
    {
        question: "Which is the heaviest dinosaur?",
        answers: [
            {text: "Diplodocus", correct: false},
            {text: "Argentinosaurus", correct: true},
            {text: "Tyrannosaurus Rex", correct: false},
            {text: "Gigantosaurus", correct: false},
        ],
    },
    {
        question: "Spinach is high in which mineral?",
        answers: [
            {text: "Zinc", correct: false},
            {text: "Calcium", correct: false},
            {text: "Potassium", correct: false},
            {text: "Iron", correct: true},
        ],
    },
    {
        question: "How many dots are on a pair of dice?",
        answers: [
            {text: "24", correct: false},
            {text: "42", correct: true},
            {text: "36", correct: false},
            {text: "28", correct: false},
        ],
    },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
  }

