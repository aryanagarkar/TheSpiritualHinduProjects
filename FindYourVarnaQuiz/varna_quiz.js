document.addEventListener('DOMContentLoaded', () => {
  const quizQuestions = [
      {
          question: "What role do you prefer in a team?",
          options: [
              { text: "Leader", varna: "Kshatriya" },
              { text: "Guide", varna: "Brahmin" },
              { text: "Organizer", varna: "Vaishya" },
              { text: "Supporter", varna: "Shudra" }
          ]
      },
      {
          question: "Which activity appeals to you the most?",
          options: [
              { text: "Teaching or Learning", varna: "Brahmin" },
              { text: "Protecting or Leading", varna: "Kshatriya" },
              { text: "Trading or Farming", varna: "Vaishya" },
              { text: "Crafting or Building", varna: "Shudra" }
          ]
      },
      // Add more questions here
  ];

  let currentQuestionIndex = 0;
  let score = {
      Brahmin: 0,
      Kshatriya: 0,
      Vaishya: 0,
      Shudra: 0
  };

  const quizContainer = document.getElementById('quiz-form');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');

  function renderQuestion(index) {
      // Clear previous question
      quizContainer.innerHTML = '';

      // Display current question
      const questionData = quizQuestions[index];
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = questionData.question;
      questionElement.appendChild(questionTitle);

      questionData.options.forEach(option => {
          const label = document.createElement('label');
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `question${index}`;
          input.value = option.varna;

          label.appendChild(input);
          label.appendChild(document.createTextNode(option.text));

          questionElement.appendChild(label);
          questionElement.appendChild(document.createElement('br'));
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
      quizContainer.innerHTML = ''; // Clear the quiz container
      const maxVarna = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
      resultContainer.textContent = `Your Varna is: ${maxVarna}`;
  }

  renderQuestion(currentQuestionIndex);

  submitButton.addEventListener('click', calculateResult);
});