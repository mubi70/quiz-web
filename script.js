const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
timePerQuestion = document.querySelector("#time"),
quiz = document.querySelector(".quiz"),
startScreen = document.querySelector(".start-screen");

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

  const loadingAnimation = () => {
    startBtn.innerHTML = "Loading";
    const interval = setInterval(() => {
      if (startBtn.innerHTML.length === 10) {
        startBtn.innerHTML = "Loading";
      } else {
        startBtn.innerHTML += ".";
      }
    }, 500);
    
    setTimeout(() => clearInterval(interval), 1000);
  };
  

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
  
  
  // Function to get a random number between 2 and 4 for the number of options
  const getRandomNumberOfOptions = () => {
    return Math.floor(Math.random() * 3) + 2;
  };
  
  const showMcq = (question) => {
    const questionText = document.querySelector(".question"),
      answersWrapper = document.querySelector(".answer-wrapper");
    questionNumber = document.querySelector(".number");
  
    questionText.innerHTML = question.question;
  
    const answers = [
      ...question.incorrect_answers,
      question.correct_answer.toString(),
    ];
  
    // Get a random number of options for the current question
    const numOptions = getRandomNumberOfOptions();
  
    while (answers.length > numOptions) {
      answers.pop(); // Remove extra options
    }
  
    // If there are fewer than the required options, add empty placeholders or repeats
    while (answers.length < numOptions) {
      answers.push(answers[Math.floor(Math.random() * answers.length)]);
    }
  
    answers.sort(() => Math.random() - 0.5);
  
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
  
    questionNumber.innerHTML = ` Question <span class="current">${questions.indexOf(question) + 1}</span>
              <span class="total">/${questions.length}</span>`;
  
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
      answer.addEventListener("click", () => {
        if (!answer.classList.contains("checked")) {
          answersDiv.forEach((answer) => {
            answer.classList.remove("selected");
          });
          answer.classList.add("selected");
          submitBtn.disabled = false;
        }
      });
    });
  
    time = timePerQuestion.value;
    startTimer(time);
  };
  
let time = 30,
  score = 0,
  currentQuestion,
  timer;

  const startQuiz = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const rollno = document.getElementById('rollno').value.trim();
  
    // Validation
    if (name === '') {
      alert('Please enter your Name.');
      return; 
    }
  
    if (rollno === '') {
      alert('Please enter your Roll number.');
      return;
    } else if (rollno.length !== 4 || isNaN(rollno)) {
      alert('Please enter a valid 4-digit Roll number.');
      return;
    }
  
    if (email === '') {
      alert('Please enter your Email.');
      return; 
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    loadingAnimation();
    
    setTimeout(() => {
      startScreen.classList.add("hide");
      quiz.classList.remove("hide");
      currentQuestion = 1;
      showQuestion(questions[0]);
    }, 1000);
  };
  
  

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
 
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("./Assets/countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      clearInterval(timer); 
      checkAnswer();
    }
  }, 1000);
};

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

submitBtn.addEventListener("click", () => {
  const selectedAnswer = document.querySelector(".answer.selected");

  // Agar koi answer select nahi kiya gaya
  if (!selectedAnswer) {
    // Alert dikhana agar answer select nahi kiya
    alert('Please select an answer before submitting!');
    return;  // Answer select na hone par submit nahi hoga
  }

  checkAnswer();  // Agar answer select kiya gaya ho to checkAnswer call hoga
});


nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
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
  } else {
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

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};


const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  percentage = document.querySelector(".Percentage"),
  grade = document.querySelector(".grade");

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
  
  const percentageScore = (score / questions.length) * 100;
  percentage.innerHTML = "Percentage: " + percentageScore.toFixed(2) + "%";
  
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

  
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

