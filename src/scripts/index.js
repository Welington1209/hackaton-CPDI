let currentQuestionIndex = 0;
let score = 0;
let helpUsed = false;
let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const checkAnswer = (isCorrect) => {
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("next-button");
  const scoreDisplay = document.getElementById("score");

  if (isCorrect) {
    if (helpUsed) {
      feedback.textContent =
        "Resposta correta, mas você usou a ajuda! Ganhou meio ponto!";
      score += 0.5;
    } else {
      feedback.textContent = "Resposta correta! Parabéns!";
      score++;
    }
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Resposta errada! Talvez na próxima.";
    feedback.style.color = "red";
  }

  scoreDisplay.textContent = `Sua pontuação: ${score * 10}`;

  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.disabled = true;
  });

  nextButton.style.display = "inline";
};

const useHelp = () => {
  if (!helpUsed) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const wrongOptions = Array.from(
      document.querySelectorAll(".option")
    ).filter((option, index) => !currentQuestion.options[index].correct);

    if (wrongOptions.length > 0) {
      const randomWrongOption =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      randomWrongOption.style.display = "none";
      document.getElementById("help-button").disabled = true;
      helpUsed = true;
    }
  }
};

const displayQuestion = () => {
  const questionTitle = document.querySelector("#question-title");
  const optionsContainer = document.getElementById("options-container");
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("next-button");
  const helpButton = document.getElementById("help-button");

  feedback.textContent = "";
  optionsContainer.innerHTML = "";
  helpButton.disabled = false;
  helpUsed = false;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  questionTitle.textContent = currentQuestion.question;

  shuffle(currentQuestion.options);

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = `(${String.fromCharCode(65 + index)}) ${option.text}`;

    button.onclick = () => checkAnswer(option.correct);
    optionsContainer.appendChild(button);
  });
};

const nextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    displayQuestion();
  } else {
    showFinalScore();
  }
};

const showFinalScore = () => {
  const questionTitle = document.getElementById("question-title");
  const optionsContainer = document.getElementById("options-container");
  const feedback = document.getElementById("feedback");
  const helpButton = document.getElementById("help-button");
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");

  optionsContainer.style.display = "none";
  helpButton.style.display = "none";
  nextButton.style.display = "none";

  questionTitle.textContent = "Quiz Finalizado!";

  const avarege = shuffledQuestions.length / 2;
  if (score > avarege) {
    feedback.textContent = `Parabéns! Você completou o quiz e acertou ${score} de ${shuffledQuestions.length}`;

    feedback.style.color = "green";
  } else {
    feedback.textContent = `Que pena! Você completou o quiz e acertou apenas ${score} de ${shuffledQuestions.length}`;

    feedback.style.color = "red";
  }

  restartButton.style.display = "inline";
};

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;

  shuffledQuestions = [...questions];
  shuffle(shuffledQuestions);

  document.getElementById("options-container").style.display = "block";
  document.getElementById("help-button").style.display = "inline";
  document.getElementById("restart-button").style.display = "none";

  document.getElementById("score").textContent = `Pontuação: ${score}`;

  displayQuestion();
}

// Inicializa o quiz
displayQuestion();
