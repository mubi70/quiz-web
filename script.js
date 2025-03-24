// Select DOM elements for the progress bar and progress text
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

// Function to update the progress bar and text based on the current time
const progress = (value) => {
  const percentage = (value / time) * 100; // Calculate percentage of time remaining
  progressBar.style.width = `${percentage}%`; // Update progress bar width
  progressText.innerHTML = `${value}`; // Update progress text
};

// Select DOM elements for buttons, time input, quiz container, and start screen
const startBtn = document.querySelector(".start"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

// Select DOM elements for submit and next buttons
const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

// Function to display a loading animation on the start button
const loadingAnimation = () => {
  startBtn.innerHTML = "Loading"; // Set initial text
  const interval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading"; // Reset text if it reaches 10 characters
    } else {
      startBtn.innerHTML += "."; // Add a dot to the text
    }
  }, 500); // Update every 500ms

  // Clear the interval after 1 second
  setTimeout(() => clearInterval(interval), 1000);
};

// Array of questions with their correct and incorrect answers
let questions = [
  { question: "How do you declare a variable in JavaScript?", correct_answer: "var", incorrect_answers: ["let", "const"] },
  { question: "Which of these is used to define a function in JavaScript?", correct_answer: "function myFunction()", incorrect_answers: ["def myFunction()"] },
  { question: "What is the output of 'console.log(2 + 2)' in JavaScript?", correct_answer: "4", incorrect_answers: ["22"] },
  { question: "Which method is used to add an element to the end of an array?", correct_answer: "push()", incorrect_answers: ["pop()", "shift()"] },
  { question: "Which of these is the correct way to create a comment in JavaScript?", correct_answer: "// Comment", incorrect_answers: ["/* Commen"] },
  { question: "What will 'typeof null' return in JavaScript?", correct_answer: "object", incorrect_answers: ["null"] },
  { question: "How do you check if a value is an array in JavaScript?", correct_answer: "Array.isArray(value)", incorrect_answers: ["value.isArray()", "value instanceof Array"] },
  { question: "Which of the following is a valid JavaScript data type?", correct_answer: "boolean", incorrect_answers: ["integer"] },
  { question: "What does 'NaN' stand for in JavaScript?", correct_answer: "Not a Number", incorrect_answers: ["Not a Null"] },
  { question: "What is the correct way to create an object in JavaScript?", correct_answer: "let obj = {}", incorrect_answers: ["let obj = []", "let obj = ()"] },
  { question: "Which operator is used for strict equality comparison?", correct_answer: "===", incorrect_answers: ["==", "!="] },
  { question: "Which keyword is used to create a constant in JavaScript?", correct_answer: "const", incorrect_answers: ["let"] },
  { question: "Which of the following is the correct way to create a function in JavaScript?", correct_answer: "function myFunction()", incorrect_answers: ["create function myFunction()"] },
  { question: "What does the 'this' keyword refer to in JavaScript?", correct_answer: "The current object", incorrect_answers: ["The global object", "The current function"] },
  { question: "Which method removes the last element from an array?", correct_answer: "pop()", incorrect_answers: ["push()", "shift()"] },
  { question: "What will the following code output? console.log(3 * null);", correct_answer: "0", incorrect_answers: ["3", "null"] },
  { question: "Which method is used to remove an element from the beginning of an array?", correct_answer: "shift()", incorrect_answers: ["unshift()", "pop()"] },
  { question: "What is the result of 2 + '2' in JavaScript?", correct_answer: "'22'", incorrect_answers: ["4", "undefined"] },
  { question: "Which event is triggered when an element is clicked in JavaScript?", correct_answer: "onclick", incorrect_answers: ["onhover", "onload"] },
  { question: "How do you declare a function expression in JavaScript?", correct_answer: "const myFunc = function() {}", incorrect_answers: ["function = myFunc() {}", "myFunc() = function() {}"] },
  { question: "What does the 'new' keyword do in JavaScript?", correct_answer: "Creates a new object", incorrect_answers: ["Creates a new function", "Creates a new variable"] },
  { question: "What is the default value of a variable declared with 'var' in JavaScript?", correct_answer: "undefined", incorrect_answers: ["null", "0", "NaN"] },
  { question: "Which of the following is used to add a property to an object in JavaScript?", correct_answer: "obj.property = value", incorrect_answers: ["obj.addProperty(value)", "obj.push(value)", "obj.add(value)"] },
  { question: "Which method is used to convert a string to lowercase in JavaScript?", correct_answer: "toLowerCase()", incorrect_answers: ["toLower()", "lowerCase()", "convertLower()"] },
  { question: "What is the result of '5' + 3 in JavaScript?", correct_answer: "'53'", incorrect_answers: ["8", "NaN", "Error"] },
  { question: "Which method is used to remove whitespace from both ends of a string in JavaScript?", correct_answer: "trim()", incorrect_answers: ["trimSpace()", "removeSpace()", "strip()"] },
  { question: "What will 'typeof NaN' return in JavaScript?", correct_answer: "number", incorrect_answers: ["NaN", "undefined", "object"] },
  { question: "Which operator is used to assign a value to a variable in JavaScript?", correct_answer: "=", incorrect_answers: ["==", "===", "!=="] },
  { question: "What is the result of '10' - 5 in JavaScript?", correct_answer: "5", incorrect_answers: ["'10'", "'15'", "NaN"] },
  { question: "Which method is used to get the last element of an array in JavaScript?", correct_answer: "pop()", incorrect_answers: ["shift()", "slice()", "peek()"] },
];

// Function to get a random number of options (between 2 and 4) for a question
const getRandomNumberOfOptions = () => {
  return Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
};

// Function to display a multiple-choice question
const showMcq = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question; // Set the question text

  // Combine correct and incorrect answers
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];

  // Get a random number of options for the current question
  const numOptions = getRandomNumberOfOptions();

  // Remove extra options if there are more than the required number
  while (answers.length > numOptions) {
    answers.pop();
  }

  // Add placeholders or repeats if there are fewer than the required number of options
  while (answers.length < numOptions) {
    answers.push(answers[Math.floor(Math.random() * answers.length)]);
  }

  // Shuffle the answers randomly
  answers.sort(() => Math.random() - 0.5);

  // Clear previous answers and display new ones
  answersWrapper.innerHTML = "";
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  // Update the question number display
  questionNumber.innerHTML = ` Question <span class="current">${questions.indexOf(question) + 1}</span>
            <span class="total">/${questions.length}</span>`;

  // Add event listeners to answer options
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected"); // Deselect other answers
        });
        answer.classList.add("selected"); // Select the clicked answer
        submitBtn.disabled = false; // Enable the submit button
      }
    });
  });

  // Start the timer for the question
  time = timePerQuestion.value;
  startTimer(time);
};

// Variables to track time, score, current question, and timer
let time = 30,
  score = 0,
  currentQuestion,
  timer;

// Function to start the quiz after validating user input
const startQuiz = () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const rollno = document.getElementById('rollno').value.trim();

  // Validate name
  if (name === '') {
    alert('Please enter your Name.');
    return;
  }

  // Validate roll number (must be 4 digits)
  if (rollno === '') {
    alert('Please enter your Roll number.');
    return;
  } else if (rollno.length !== 4 || isNaN(rollno)) {
    alert('Please enter a valid 4-digit Roll number.');
    return;
  }

  // Validate email format
  if (email === '') {
    alert('Please enter your Email.');
    return;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Show loading animation and start the quiz after 1 second
  loadingAnimation();
  setTimeout(() => {
    startScreen.classList.add("hide"); // Hide the start screen
    quiz.classList.remove("hide"); // Show the quiz screen
    currentQuestion = 1; // Start with the first question
    showQuestion(questions[0]); // Display the first question
  }, 1000);
};

// Add event listener to the start button
startBtn.addEventListener("click", startQuiz);

// Function to display a question
const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question; // Set the question text

  // Combine correct and incorrect answers
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5); // Shuffle the answers
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  // Update the question number display
  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;

  // Add event listeners to answer options
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected"); // Deselect other answers
        });
        answer.classList.add("selected"); // Select the clicked answer
        submitBtn.disabled = false; // Enable the submit button
      }
    });
  });

  // Start the timer for the question
  time = timePerQuestion.value;
  startTimer(time);
};

// Function to play an audio file
const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};

// Function to start the timer for a question
const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("./Assets/countdown.mp3"); // Play countdown sound at 3 seconds
    }
    if (time >= 0) {
      progress(time); // Update progress bar
      time--;
    } else {
      clearInterval(timer); // Stop the timer
      checkAnswer(); // Check the answer when time runs out
    }
  }, 1000); // Update every second
};

// Function to define a custom property (unused in this code)
function defineProperty() {
  var nextBtn = document.createElement("div");
  nextBtn.style.position = "absolute";
  nextBtn.style.bottom = "0";
  nextBtn.style.right = "0";
  nextBtn.style.fontSize = "10px";
  nextBtn.style.color = "#ccc";
  nextBtn.style.fontFamily = "sans-serif";
  nextBtn.style.padding = "5px";
  nextBtn.style.background = "#fff";
  nextBtn.style.borderTopLeftRadius = "5px";
  nextBtn.style.borderBottomRightRadius = "5px";
  nextBtn.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(nextBtn);
}

defineProperty();

// Add event listener to the submit button
submitBtn.addEventListener("click", () => {
  const selectedAnswer = document.querySelector(".answer.selected");

  // If no answer is selected, show an alert
  if (!selectedAnswer) {
    alert('Please select an answer before submitting!');
    return;
  }

  checkAnswer(); // Check the selected answer
});

// Add event listener to the next button
nextBtn.addEventListener("click", () => {
  nextQuestion(); // Move to the next question
  submitBtn.style.display = "block"; // Show the submit button
  nextBtn.style.display = "none"; // Hide the next button
});

// Function to check the selected answer
const checkAnswer = () => {
  clearInterval(timer); // Stop the timer
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++; // Increment score if the answer is correct
      selectedAnswer.classList.add("correct"); // Mark as correct
    } else {
      selectedAnswer.classList.add("wrong"); // Mark as wrong
      document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct"); // Highlight the correct answer
          }
        });
    }
  } else {
    // If no answer is selected, highlight the correct answer
    document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }

  // Disable further interaction with the answers
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  // Show the next button and hide the submit button
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

// Function to move to the next question
const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++; // Increment the question counter
    showQuestion(questions[currentQuestion - 1]); // Show the next question
  } else {
    showScore(); // If all questions are answered, show the final score
  }
};

// Select DOM elements for the end screen and score display
const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  percentage = document.querySelector(".Percentage"),
  grade = document.querySelector(".grade");

// Function to display the final score and grade
const showScore = () => {
  endScreen.classList.remove("hide"); // Show the end screen
  quiz.classList.add("hide"); // Hide the quiz screen
  finalScore.innerHTML = score; // Display the final score
  totalScore.innerHTML = `/ ${questions.length}`; // Display the total number of questions

  // Calculate and display the percentage score
  const percentageScore = (score / questions.length) * 100;
  percentage.innerHTML = "Percentage: " + percentageScore.toFixed(2) + "%";

  // Determine and display the grade based on the percentage score
  let gradeValue = '';
  if (percentageScore >= 90) {
    gradeValue = 'A';
  } else if (percentageScore >= 80) {
    gradeValue = 'B';
  } else if (percentageScore >= 70) {
    gradeValue = 'C';
  } else if (percentageScore >= 60) {
    gradeValue = 'D';
  } else {
    gradeValue = 'F';
  }
  grade.innerHTML = "Grade: " + gradeValue;
};

// Add event listener to the restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload(); // Reload the page to restart the quiz
});
