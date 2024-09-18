document.addEventListener("DOMContentLoaded", () => {
  const quizQuestions = [
    {
      question: "What role do you prefer in a team?",
      options: [
        { text: "Leading and making strategic decisions.", varna: "Kshatriya" },
        { text: "Researching and providing detailed information.", varna: "Brahmin" },
        { text: "Performing hands-on tasks and supporting others in implementing solutions.", varna: "Shudra" },
        { text: "Managing resources and coordinating logistics.", varna: "Vaishya" },
      ],
    },
    {
        question: "What activity would you find most rewarding?",
        options: [
          { text: "Solving intellectual puzzles and brain-teasers.", varna: "Brahmin" },
          { text: "Competitive team sports.", varna: "Kshatriya" },
          { text: "Strategic games that involve trading or finance.", varna: "Vaishya" },
          { text: "Crafting or DIY projects.", varna: "Shudra" },
        ],
    },
    {
        question: "How do you handle conflicts or disagreements?",
        options: [
          { text: "Taking charge and taking decisive actions.", varna: "Kshatriya" },
          { text: "Focusing on practical solutions to resolve the immediate issues and moving forward.", varna: "Shudra" },
          { text: "Negotiating compromises that maximize benefit for all.", varna: "Vaishya" },
          { text: "Discussing details and finding a logical resolution.", varna: "Brahmin" },
        ],
    },
    {
        question: "What motivates you most in your daily work?",
        options: [
          { text: "Financial success and innovation", varna: "Vaishya" },
          { text: "Ambition, responsibility, and striving for excellence", varna: "Kshatriya" },
          { text: "Intellectual growth and personal fulfillment", varna: "Brahmin" },
          { text: "Helping others and fulfilling practical needs", varna: "Shudra" },
        ],
    },
    {
        question: "What career would appeal to you the most?",
        options: [
          { text: "Marketing Specialist or Salesperson.", varna: "Vaishya" },
          { text: "Military Officer or Business Executive.", varna: "Kshatriya" },
          { text: "Professor or Research Scientist.", varna: "Brahmin" },
          { text: "Administrative Assistant or Lab Technician.", varna: "Shudra" },
        ],
    },
  ];

  let currentQuestionIndex = 0;
  let score = {
    Brahmin: 0,
    Kshatriya: 0,
    Vaishya: 0,
    Shudra: 0,
  };

  const quizContainer = document.getElementById("quiz-form");
  const resultContainer = document.getElementById("result");
  const submitButton = document.getElementById("submit");

  function renderQuestion(index) {
    // Clear previous question
    quizContainer.innerHTML = "";

    // Display current question
    const questionData = quizQuestions[index];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = questionData.question;
    questionElement.appendChild(questionTitle);

    questionData.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = option.varna;

      label.appendChild(input);
      label.appendChild(document.createTextNode(option.text));

      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(questionElement);

    // Change button text on the last question
    if (index === quizQuestions.length - 1) {
      submitButton.textContent = "See My Result";
    }
  }

  function calculateResult() {
    const formData = new FormData(quizContainer);
    const selectedAnswer = formData.get(`question${currentQuestionIndex}`);

    if (selectedAnswer) {
      score[selectedAnswer]++;
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion(currentQuestionIndex);
      } else {
        displayResult();
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  }

  function displayResult() {
    quizContainer.innerHTML = ""; // Clear the quiz container
    const maxVarna = Object.keys(score).reduce((a, b) =>
      score[a] > score[b] ? a : b
    );
    resultContainer.textContent = `Your Varna is: ${maxVarna}`;
  }

  renderQuestion(currentQuestionIndex);

  submitButton.addEventListener("click", calculateResult);
});
