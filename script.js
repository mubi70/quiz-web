// Progress bar aur progress text ke HTML elements ko select karte hain
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

// Current time ke hisaab se progress bar aur text ko update karne wala function
const progress = (value) => {
  const percentage = (value / time) * 100; /// Bacha hua time ka percentage calculate karte hain
  progressBar.style.width = `${percentage}%`; // Progress bar ki width update karte hain
  progressText.innerHTML = `${value}`; // Progress text ko update karte hain
};

// Buttons, time input, quiz container, aur start screen ke HTML elements ko select karte hain
const startBtn = document.querySelector(".start"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

// Submit aur next buttons ke HTML elements ko select karte hain
const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

// Start button par loading animation dikhane wala function
const loadingAnimation = () => {
  startBtn.innerHTML = "Loading"; // Set initial text
  const interval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading"; //// Agar text 10 characters tak pahunch jaye to usse reset karte hain
    } else {
      startBtn.innerHTML += "."; /// Text me ek dot add karte hain
    }
  }, 500); /// Har 500ms me update karte hain

  /// 1 second ke baad interval ko clear karte hain
  setTimeout(() => clearInterval(interval), 1000);
};

/// Questions ka array jisme correct aur incorrect answers diye gaye hain
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

// // Ek sawal ke liye random number of options (2 se 4 ke beech) get karne wala function
const getRandomNumberOfOptions = () => {
  return Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
};

// // Multiple-choice question dikhane wala function
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

// Current sawal ke liye random number of options get karte hain
const numOptions = getRandomNumberOfOptions();

// Agar required number se zyada options hain to extra options hata dete hain
while (answers.length > numOptions) {
    answers.pop();
  }

// Agar required number se kam options hain to placeholders ya repeats add karte hain
while (answers.length < numOptions) {
    answers.push(answers[Math.floor(Math.random() * answers.length)]);
  }

// Answers ko randomly shuffle karte hain
answers.sort(() => Math.random() - 0.5);

// Pehle ke answers clear karte hain aur naye answers display karte hain
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

// Question number ka display update karte hain
questionNumber.innerHTML = ` Question <span class="current">${questions.indexOf(question) + 1}</span>
            <span class="total">/${questions.length}</span>`;

// Answer par event listeners add karte hain
const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected"); // Baaki answers ko deselect karte hain
        });
        answer.classList.add("selected"); // Select the clicked answer
        submitBtn.disabled = false; // Enable the submit button
      }
    });
  });

// Question ke liye timer start karte hain
time = timePerQuestion.value;
  startTimer(time);
};

// Time, score, current question, aur timer ko track karne ke liye variables
let time = 30,
  score = 0,
  currentQuestion,
  timer;

// User input validate karne ke baad quiz start karne wala function
const startQuiz = () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const rollno = document.getElementById('rollno').value.trim();

// Name ko validate karte hain
if (name === '') {
    alert('Please enter your Name.');
    return;
  }

// Roll number ko validate karte hain (4 digits hona chahiye)
if (rollno === '') {
    alert('Please enter your Roll number.');
    return;
  } else if (rollno.length !== 4 || isNaN(rollno)) {
    alert('Please enter a valid 4-digit Roll number.');
    return;
  }

// Email format ko validate karte hain
if (email === '') {
    alert('Please enter your Email.');
    return;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

// Loading animation dikhate hain aur 1 second baad quiz start karte hain
loadingAnimation();
  setTimeout(() => {
    startScreen.classList.add("hide"); // Hide the start screen
    quiz.classList.remove("hide"); // Show the quiz screen
    currentQuestion = 1; // Start with the first question
    showQuestion(questions[0]); // Display the first question
  }, 1000);
};

// Start button par event listener add karte hain
startBtn.addEventListener("click", startQuiz);

// Question display karne wala function
const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question; // Set the question text

// Correct aur incorrect answers ko combine karte hain
const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5); //// Answers ko shuffle karte hain
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

// Question number ka display update karte hain
questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;

// Answer options par event listeners add karte hain
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

// Question ke liye timer start karte hain
time = timePerQuestion.value;
  startTimer(time);
};

// Audio file play karne wala function
 const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};

// Question ke liye timer start karne wala function
const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("./Assets/countdown.mp3"); // 3 seconds par countdown sound play karte hain
    }
    if (time >= 0) {
      progress(time); // Progress bar ko update karte hain
      time--;
    } else {
      clearInterval(timer); // Timer ko stop karte hain
      checkAnswer(); // Jab time khatam ho jaye tab answer check karte hain
    }
  }, 1000); // Har second update karte hain
};

// Custom property define karne wala function (is code me use nahi hua)
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
  window.onload = function () {
    document.getElementById("welcomeModal").style.display = "flex";
  };

  function closeModal() {
    document.getElementById("welcomeModal").style.display = "none";
  }

