(function() {
    // Main variables
    let currentIndex = 0;
    let totalScore = 0;
    const questionsList = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        answer: "Paris"
      },
      {
        question: "What is the square root of 16?",
        options: ["2", "3", "4", "5"],
        answer: "4"
      },
      {
        question: "Who is the current president of the United States?",
        options: ["Donald Trump", "Barack Obama", "Joe Biden", "George Bush"],
        answer: "Joe Biden"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
      }
    ];
  
    // Style for dynamic elements with colors as words
    const styles = `
      body {
        font-family: 'Arial', sans-serif;
        background-color: lightgray;
        margin: 0;
        padding: 0;
      }
  
      .quiz-wrapper {
        max-width: 350px;
        margin: 50px auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
  
      h1 {
        color: darkslategray;
      }
  
      .options-container {
        list-style-type: none;
        padding: 0;
        margin: 20px 0;
      }
  
      .option {
        margin: 10px 0;
        padding: 12px;
        background-color: lightblue;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
      }
  
      .option:hover {
        background-color: deepskyblue;
      }
  
      .option:active {
        transform: scale(0.98);
      }
  
      #feedback {
        font-weight: bold;
        margin-top: 20px;
      }
  
      #next-btn {
        margin-top: 20px;
        padding: 10px;
        background-color: forestgreen;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: none;
      }
  
      #next-btn:hover {
        background-color: darkgreen;
      }
  
      #score-board {
        margin-top: 20px;
        font-size: 18px;
        color: steelblue;
      }
    `;
    
    // Inject styles dynamically
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  
    // Create and append HTML structure
    const quizWrapper = document.createElement('div');
    quizWrapper.className = 'quiz-wrapper';
    document.body.appendChild(quizWrapper);
  
    const title = document.createElement('h1');
    title.textContent = 'QUIZ';
    quizWrapper.appendChild(title);
  
    const questionContainer = document.createElement('div');
    quizWrapper.appendChild(questionContainer);
  
    const feedback = document.createElement('div');
    feedback.id = 'feedback';
    quizWrapper.appendChild(feedback);
  
    const nextButton = document.createElement('button');
    nextButton.id = 'next-btn';
    nextButton.textContent = 'Next Question';
    nextButton.onclick = loadNextQuestion;
    quizWrapper.appendChild(nextButton);
  
    const scoreBoard = document.createElement('div');
    scoreBoard.id = 'score-board';
    quizWrapper.appendChild(scoreBoard);
  
    // Function to load the current question
    function loadQuestion() {
      // Clear previous feedback and options
      feedback.textContent = '';
      questionContainer.innerHTML = '';
  
      const currentQuestion = questionsList[currentIndex];
  
      const questionElement = document.createElement('p');
      questionElement.textContent = currentQuestion.question;
      questionContainer.appendChild(questionElement);
  
      const optionsList = document.createElement('ul');
      optionsList.className = 'options-container';
  
      currentQuestion.options.forEach(option => {
        const optionItem = document.createElement('li');
        optionItem.className = 'option';
        optionItem.textContent = option;
        optionItem.onclick = () => checkAnswer(option);
        optionsList.appendChild(optionItem);
      });
  
      questionContainer.appendChild(optionsList);
    }
  
    // Function to check the selected answer
    function checkAnswer(selectedOption) {
      const currentQuestion = questionsList[currentIndex];
  
      // Provide feedback based on the answer
      if (selectedOption === currentQuestion.answer) {
        feedback.textContent = 'Correct Answer!';
        feedback.style.color = 'green';
        totalScore++;
      } else {
        feedback.textContent = 'Incorrect Answer!';
        feedback.style.color = 'red';
      }
  
      // Disable further selections and show "Next Question" button
      const options = document.querySelectorAll('.option');
      options.forEach(option => option.onclick = null);
      nextButton.style.display = 'block';
    }
  
    // Function to load the next question or show score
    function loadNextQuestion() {
      currentIndex++;
  
      if (currentIndex < questionsList.length) {
        loadQuestion();
        nextButton.style.display = 'none';
      } else {
        displayFinalScore();
      }
    }
  
    // Function to display the final score
    function displayFinalScore() {
      scoreBoard.textContent = `Your Score: ${totalScore} / ${questionsList.length}`;
      nextButton.style.display = 'none';
    }
  
    // Initialize the quiz
    loadQuestion();
  })();