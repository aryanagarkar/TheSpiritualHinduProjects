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
      question: "What activity would you like to do in your free time?",
      options: [
        { text: "Reading or jounaling.", varna: "Brahmin" },
        { text: "Competitive team sports.", varna: "Kshatriya" },
        { text: "Strategic board games.", varna: "Vaishya" },
        { text: "Crafting or DIY projects.", varna: "Shudra" },
      ],
  },
    {
      question: "What kind of movies or TV shows would you prefer?",
      options: [
        { text: "Sitcoms and reality TV shows", varna: "Shudra" },
        { text: "Entrprenurial and business reality shows or movies.", varna: "Vaishya" },
        { text: "Documentaries and educational content.", varna: "Brahmin" },
        { text: "Action-packed, adventure, or sports-related films.", varna: "Kshatriya" },
      ],
    },
    {
      question: "How do you learn best?",
      options: [
        { text: "Reading textbooks and academic resources.", varna: "Brahmin" },
        { text: "Hands-on projects and real-life applications.", varna: "Shudra" },
        { text: "Competitive environments and challenges.", varna: "Kshatriya" },
        { text: "Analyzing case studies and evaluating statistical outcomes.", varna: "Vaishya" },
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

  const varnaDescriptions = {
    Brahmin: "Brahmins are often associated with intellectual and spiritual pursuits. They value learning, knowledge, and wisdom, and they tend to gravitate toward research, teaching, and roles that involve deep thinking.",
    Kshatriya: "Kshatriyas are natural leaders and warriors. They thrive in roles that involve responsibility, ambition, and a desire to lead others. They are decisive, courageous, and often prefer action-oriented tasks.",
    Vaishya: "Vaishyas are resourceful and thrive in business, trade, and financial matters. They are often entrepreneurial, managing resources, and enjoy activities that involve negotiation, strategy, and innovation.",
    Shudra: "Shudras are practical, hands-on workers who find fulfillment in tasks that support others and meet practical needs. They excel in roles that involve craftsmanship, administrative tasks, or technical support."
  };

  const quizContainer = document.getElementById("quiz-form");
  const resultContainer = document.getElementById("result");
  const submitButton = document.getElementById("submit");

  let currentQuestionIndex = 0;
  let score = {
    Brahmin: 0,
    Kshatriya: 0,
    Vaishya: 0,
    Shudra: 0,
  };

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

    // Change button text when the last question is displayed
    if (index === quizQuestions.length - 1) {
      submitButton.textContent = "See My Result";  // Button text changes immediately when the last question is shown
    } else {
      submitButton.textContent = "Next";  // Ensure "Next" text is shown on earlier questions
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
    submitButton.style.display = "none";

    const maxVarna = Object.keys(score).reduce((a, b) => {
      return score[a] >= score[b] ? a : b;
    });

    // Fetch the description for the chosen varna
    const varnaDescription = varnaDescriptions[maxVarna];

    // Display the result
    resultContainer.innerHTML = `<h2>Your Varna is: ${maxVarna}</h2><p class="varna-description">${varnaDescription}</p>`;
  }

  renderQuestion(currentQuestionIndex);

  submitButton.addEventListener("click", calculateResult);
});
