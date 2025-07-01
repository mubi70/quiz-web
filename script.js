// Progress bar aur progress text ke HTML elements ko select karte hain
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

// Current time ke hisaab se progress bar aur text ko update karne wala function
const progress = (value) => {
  const percentage = (value / time) * 100; // Bacha hua time ka percentage calculate karte hain
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
      startBtn.innerHTML = "Loading"; // Agar text 10 characters tak pahunch jaye to usse reset karte hain
    } else {
      startBtn.innerHTML += "."; // Text me ek dot add karte hain
    }
  }, 500); // Har 500ms me update karte hain

  // 1 second ke baad interval ko clear karte hain
  setTimeout(() => clearInterval(interval), 1000);
};

// Questions ka array jisme correct aur incorrect answers aur explanation diye gaye hain
let questions = [
  { question: "How do you declare a variable in JavaScript?", correct_answer: "var", incorrect_answers: ["let", "const"], explanation: "In JavaScript, variables can be declared using 'var', 'let', or 'const'. 'var' is the older way and has function scope, while 'let' and 'const' have block scope. The correct answer is 'var' as it was specifically asked." },
  { question: "Which of these is used to define a function in JavaScript?", correct_answer: "function myFunction()", incorrect_answers: ["def myFunction()"], explanation: "'def' is used in Python, not JavaScript. The correct syntax to define a function in JavaScript is 'function myFunction()'." },
  { question: "What is the output of 'console.log(2 + 2)' in JavaScript?", correct_answer: "4", incorrect_answers: ["22"], explanation: "In JavaScript, the '+' operator performs arithmetic addition for numbers, so 2 + 2 equals 4, not string concatenation which would result in '22'." },
  { question: "Which method is used to add an element to the end of an array?", correct_answer: "push()", incorrect_answers: ["pop()", "shift()"], explanation: "'push()' adds an element to the end of an array, while 'pop()' removes the last element, and 'shift()' removes the first element." },
  { question: "Which of these is the correct way to create a comment in JavaScript?", correct_answer: "// Comment", incorrect_answers: ["/* Commen"], explanation: "'// Comment' is the correct syntax for a single-line comment in JavaScript. '/* Commen' is incorrect as it is an incomplete multi-line comment syntax." },
  { question: "What will 'typeof null' return in JavaScript?", correct_answer: "object", incorrect_answers: ["null"], explanation: "In JavaScript, 'typeof null' returns 'object' due to a historical bug in the language, not 'null'." },
  { question: "How do you check if a value is an array in JavaScript?", correct_answer: "Array.isArray(value)", incorrect_answers: ["value.isArray()", "value instanceof Array"], explanation: "'Array.isArray(value)' is the most reliable way to check if a value is an array. 'instanceof Array' can fail in some cases, and 'value.isArray()' is not a valid method." },
  { question: "Which of the following is a valid JavaScript data type?", correct_answer: "boolean", incorrect_answers: ["integer"], explanation: "JavaScript has data types like 'boolean', but 'integer' is not a distinct type; numbers in JavaScript are all 'number' type (floating-point)." },
  { question: "What does 'NaN' stand for in JavaScript?", correct_answer: "Not a Number", incorrect_answers: ["Not a Null"], explanation: "'NaN' stands for 'Not a Number', indicating an invalid or unrepresentable numerical value, not 'Not a Null'." },
  { question: "What is the correct way to create an object in JavaScript?", correct_answer: "let obj = {}", incorrect_answers: ["let obj = []", "let obj = ()"], explanation: "'let obj = {}' creates an object. 'let obj = []' creates an array, and 'let obj = ()' is invalid syntax." },
  { question: "Which operator is used for strict equality comparison?", correct_answer: "===", incorrect_answers: ["==", "!="], explanation: "'===' checks for strict equality (value and type), while '==' performs type coercion, and '!=' is for inequality." },
  { question: "Which keyword is used to create a constant in JavaScript?", correct_answer: "const", incorrect_answers: ["let"], explanation: "'const' declares a constant that cannot be reassigned, while 'let' allows reassignment." },
  { question: "Which of the following is the correct way to create a function in JavaScript?", correct_answer: "function myFunction()", incorrect_answers: ["create function myFunction()"], explanation: "'function myFunction()' is the correct syntax. 'create function' is not valid in JavaScript." },
  { question: "What does 'this' keyword refer to in JavaScript?", correct_answer: "The current object", incorrect_answers: ["The global object", "The current function"], explanation: "'this' refers to the current object in the context it is used, not necessarily the global object or function." },
  { question: "Which method removes the last element from an array?", correct_answer: "pop()", incorrect_answers: ["push()", "shift()"], explanation: "'pop()' removes the last element, while 'push()' adds to the end, and 'shift()' removes from the start." },
  { question: "What will the following code output? console.log(3 * null);", correct_answer: "0", incorrect_answers: ["3", "null"], explanation: "In JavaScript, 'null' is coerced to 0 in arithmetic operations, so 3 * null equals 0." },
  { question: "Which method is used to remove an element from the beginning of an array?", correct_answer: "shift()", incorrect_answers: ["unshift()", "pop()"], explanation: "'shift()' removes the first element, 'unshift()' adds to the start, and 'pop()' removes from the end." },
  { question: "What is the result of 2 + '2' in JavaScript?", correct_answer: "'22'", incorrect_answers: ["4", "undefined"], explanation: "The '+' operator concatenates when one operand is a string, so 2 + '2' results in '22'." },
  { question: "Which event is triggered when an element is clicked in JavaScript?", correct_answer: "onclick", incorrect_answers: ["onhover", "onload"], explanation: "'onclick' is the event for a click, while 'onhover' is not a standard event, and 'onload' is for page loading." },
  { question: "How do you declare a function expression in JavaScript?", correct_answer: "const myFunc = function() {}", incorrect_answers: ["function = myFunc() {}", "myFunc() = function() {}"], explanation: "'const myFunc = function() {}' is a function expression. The other options are invalid syntax." },
  { question: "What does the 'new' keyword do in JavaScript?", correct_answer: "Creates a new object", incorrect_answers: ["Creates a new function", "Creates a new variable"], explanation: "'new' creates a new object instance, not a function or variable." },
  { question: "What is the default value of a variable declared with 'var' in JavaScript?", correct_answer: "undefined", incorrect_answers: ["null", "0", "NaN"], explanation: "Variables declared with 'var' are initialized to 'undefined' if no value is assigned." },
  { question: "Which of the following is used to add a property to an object in JavaScript?", correct_answer: "obj.property = value", incorrect_answers: ["obj.addProperty(value)", "obj.push(value)", "obj.add(value)"], explanation: "'obj.property = value' adds a property. The other methods are either invalid or used for arrays." },
  { question: "Which method is used to convert a string to lowercase in JavaScript?", correct_answer: "toLowerCase()", incorrect_answers: ["toLower()", "lowerCase()", "convertLower()"], explanation: "'toLowerCase()' is the correct method. The others do not exist in JavaScript." },
  { question: "What is the result of '5' + 3 in JavaScript?", correct_answer: "'53'", incorrect_answers: ["8", "NaN", "Error"], explanation: "The '+' operator concatenates when one operand is a string, so '5' + 3 results in '53'." },
  { question: "Which method is used to remove whitespace from both ends of a string in JavaScript?", correct_answer: "trim()", incorrect_answers: ["trimSpace()", "removeSpace()", "strip()"], explanation: "'trim()' removes whitespace from both ends. The other methods are not standard in JavaScript." },
  { question: "What will 'typeof NaN' return in JavaScript?", correct_answer: "number", incorrect_answers: ["NaN", "undefined", "object"], explanation: "'typeof NaN' returns 'number' because NaN is a special value of the number type." },
  { question: "Which operator is used to assign a value to a variable in JavaScript?", correct_answer: "=", incorrect_answers: ["==", "===", "!=="], explanation: "'=' is the assignment operator, while '==' and '===' are for comparison, and '!==' is for inequality." },
  { question: "What is the result of '10' - 5 in JavaScript?", correct_answer: "5", incorrect_answers: ["'10'", "'15'", "NaN"], explanation: "The '-' operator performs arithmetic, converting '10' to a number, so '10' - 5 equals 5." },
  { question: "Which method is used to get the last element of an array in JavaScript?", correct_answer: "pop()", incorrect_answers: ["shift()", "slice()", "peek()"], explanation: "'pop()' removes and returns the last element. Use 'array[array.length - 1]' to get it without removing." }
];

const getRandomNumberOfOptions = () => {
  return Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
};

// Multiple-choice question dikhane wala function
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
  answers.sort(() => Math.random() - 0.5); // Answers ko shuffle karte hain
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

// Popup dikhane wala function jab answer ghalat ho
const showExplanationPopup = (explanation) => {
  const popup = document.getElementById('explanationPopup');
  const explanationText = document.getElementById('explanationText');
  explanationText.innerHTML = explanation;
  popup.classList.remove('hide');
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

// Submit button ke liye event listener add karo
submitBtn.addEventListener("click", () => {
  const selectedAnswer = document.querySelector(".answer.selected");

  // Agar koi answer select nahi kiya gaya ho to ek alert dikhao
  if (!selectedAnswer) {
    alert('Please select an answer before submitting!');
    return;
  }

  checkAnswer(); // Selected answer check karo
});

// Next button par event listener lagao
nextBtn.addEventListener("click", () => {
  // Hide the explanation popup when moving to the next question
  document.getElementById('explanationPopup').classList.add('hide');
  nextQuestion(); // Move to the next question
  submitBtn.style.display = "block"; // Show the submit button
  nextBtn.style.display = "none"; // Hide the next button
});

// Selected answer check karne wala function
const checkAnswer = () => {
  clearInterval(timer); // Stop the timer
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++; // Agar answer sahi ho to score increment karo
      selectedAnswer.classList.add("correct"); // Sahi answer
    } else {
      selectedAnswer.classList.add("wrong"); // Ghalat answer
      // Show explanation popup for wrong answer
      showExplanationPopup(questions[currentQuestion - 1].explanation);
      document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct"); // Correct answer ko highlight karo
          }
        });
    }
  } else {
    // Agar koi answer select nahi kiya gaya ho to correct answer ko highlight karo
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

  // Answers ke saath aage interaction disable karo
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  // Next button dikhao aur submit button chhupao
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

// Next question par jaane wala function
const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++; // Question counter ko increment karo
    showQuestion(questions[currentQuestion - 1]); // Agla question dekhao
  } else {
    showScore(); // If all questions are answered, show the final score
  }
};

// Agar saare questions answer kar liye gaye hoon to final score dikhao
const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  percentage = document.querySelector(".Percentage"),
  grade = document.querySelector(".grade"),
  emoji = document.querySelector(".emoji"),
  statusText = document.querySelector(".status-text");

// Final score aur grade dikhane wala function
const showScore = () => {
  endScreen.classList.remove("hide"); // Show the end-screen
  quiz.classList.add("hide"); // Hide the quiz screen
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
  const percentageScore = (score / questions.length) * 100;
  percentage.innerHTML = "Percentage: " + percentageScore.toFixed(2) + "%";

  let gradeValue = '', emojiValue = '', status = '';
  if (percentageScore >= 90) {
    gradeValue = 'A'; emojiValue = '😊'; status = 'Excellent!';
  } else if (percentageScore >= 80) {
    gradeValue = 'B'; emojiValue = '🙂'; status = 'Great job!';
  } else if (percentageScore >= 70) {
    gradeValue = 'C'; emojiValue = '😐'; status = 'Good effort!';
  } else if (percentageScore >= 60) {
    gradeValue = 'D'; emojiValue = '😕'; status = 'Satisfactory, keep going!';
  } else {
    gradeValue = 'F'; emojiValue = '😞'; status = 'Needs improvement';
  }
  grade.innerHTML = "Grade: " + gradeValue;
  emoji.innerHTML = emojiValue;
  statusText.innerHTML = status; // Remove the score percentage from here to avoid duplication
};

// Restart button par event listener lagao
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload(); // Quiz dobara shuru karne ke liye page reload karo
});

window.onload = function () {
  document.getElementById("welcomeModal").style.display = "flex";
};

function closeModal() {
  document.getElementById("welcomeModal").style.display = "none";
}