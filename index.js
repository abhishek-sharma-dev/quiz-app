import quizDataArr from "./quizAppData.js";
import userData from "./userData.js";

let qtnBlock = document.getElementById("quiz-Question");
let btn = document.getElementById("nextBtn");

let currQtnNo = 0;
// final data structure of answerDataArr will be [{answer: "C", myAnswer: "D"}, {answer: "A", myAnswer: "A"}];

// let answerDataArr = [{answer: "C"}, {answer: "A"}, {answer: "D"}, {answer: "A"}, {answer: "D"}, {answer: "A"}];
let answerDataArr = [];

// on pageload
(function () {
  // if login crredential dont match then redirect to login.html
  let userLocalstorageData = JSON.parse(localStorage.getItem("UserData"));

  if (
    (userLocalstorageData &&
    (userLocalstorageData.userName !== userData.userName ||
    userLocalstorageData.password !== userData.password)) || !userLocalstorageData
  ) {
    window.location.replace("http://192.168.0.109:5500/login.html");
  }

  // dont display result container on page load
  let result = document.getElementById("result");
  result.style.display = "none";

  // assign onlick function to option radio buttons
  let radiosBtn = document.querySelectorAll('input[type="radio"]');
  radiosBtn.forEach(function (rBtn) {
    rBtn.onclick = function () {
      let myAnswerVal = this.value;
      let currentAnsObj = answerDataArr[currQtnNo];

      currentAnsObj.myAnswer = myAnswerVal;
    };

    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.onclick = function () {
      logoutUser();
    }
  });

  // initialize Quiz Answer Data
  populateQuizData(currQtnNo, quizDataArr);

  //enter all answer data into answerDataArr;
  for (let i = 0; i < quizDataArr.length; i++) {
    let { answer } = quizDataArr[i];
    answerDataArr.push({ answer });
  }
})();

let nextBtn = document.getElementById("nextBtn");
nextBtn.onclick = function () {
  nextQuestion(quizDataArr);
};

function populateQuizData(currQtnNo, quizData) {
  let { question, options, answer } = quizData[currQtnNo];
  let qtnTextSpan = document.createElement("span");
  qtnTextSpan.innerText = `Q${(currQtnNo += 1)}. ${question}`;
  qtnBlock.innerHTML = "";
  qtnBlock.appendChild(qtnTextSpan);

  // add options text to "option" div
  let optionDiv = document.getElementsByClassName("option");
  for (let i = 0; i < optionDiv.length; i++) {
    let labelElmt = optionDiv[i].lastElementChild;
    labelElmt.innerHTML = options[i];
  }
}

function nextQuestion(quizArr) {
  currQtnNo = currQtnNo + 1;
  const allRadioBtns = document.querySelectorAll('input[type="radio"]');

  allRadioBtns.forEach(function (rbtn) {
    rbtn.checked = false;
  });

  populateQuizData(currQtnNo, quizArr);
  let lastElement = quizArr[quizArr.length - 1];
  if (quizArr[currQtnNo] == lastElement) {
    btn.innerHTML = "Submit";
    btn.id = "submitBtn";
    let submitBtn = document.getElementById("submitBtn");
    submitBtn.onclick = function () {
      quizResult(quizDataArr);
    };
  }
}

function quizResult() {
  let quizContainer = document.getElementById("quiz-container");
  
  quizContainer.style.display = "none";
  
  if ((btn.id = "submitBtn")) {
    result.style.display = "flex";
    checkAnswer();
  }
  // reload a quiz with reloading the page
  let playAgainBtn = document.getElementById("playAgainBtn");
  playAgainBtn.onclick = function () {
    location.reload()
  };
}

function checkAnswer() {
  let corrAnswer = document.getElementById("corrAnswer");
  let wrongAnswer = document.getElementById("wrongAnswer");
  let notAttempted = document.getElementById("notAttempted");
  
  
  let totalCorrectAnswer = 0;
  let totalWrongAnswer = 0;
  let totalNotAttempted = 0;
  
  for (let i = 0; i < answerDataArr.length; i++) {
    const resultData = answerDataArr[i];
    
    if (resultData.answer == resultData.myAnswer) {
      totalCorrectAnswer++;
    } else if (answerDataArr[i].myAnswer == undefined) {
      totalNotAttempted++;
    } else if (resultData.answer !== resultData.myAnswer) {
      totalWrongAnswer++;
    }
  }
  
  corrAnswer.innerHTML = totalCorrectAnswer;
  wrongAnswer.innerHTML = totalWrongAnswer;
  notAttempted.innerHTML = totalNotAttempted;
  
}

function logoutUser() {
  var logoutUserData = JSON.parse(localStorage.getItem("UserData"));
  localStorage.clear(logoutUserData);
  console.log(localStorage);
  if (localStorage.length == 0) {
    window.location.replace("http://192.168.0.109:5500/login.html");
  }
}

