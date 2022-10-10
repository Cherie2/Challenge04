
var questions = [
    {
    question: "What do Javascript file extensions end with?",
    answers: ["A.) .css","B.) .js","C.) .html","D.) .md"],
    answer:"B.) .js"
    },
    {
    question:"HTML is the framework of the web page while CSS styles it, what does Javascript provide?",
    answers: ["A: Advanced styling","B: Audio","C: Objects","D: Interactive Platform"],
    answer:"D: Interactive Platform"
    },
    {
    question:"Javascript uses what to denote an array?",
    answers: ["A.) Square Brackets","B.) Curly Brackets","C.) Parathesis","D.)Apostrophe Marks"],
    answer:"A.) Square Brackets"
    },
    {
    question:"In order to run a function in Javascript, what must be done?",
    answers:["A.) It will run on its own","B.) Put the function at the top of the page","C.) Call them by name to execute","D.) Functions don't run"],
    answer:"C.) Call them by name to execute"
    },
    {
    question:"Variables are containers that store __?",
    answers:["A.) Language", "B.) Text", "C.) Factors", "D.) Values"],
    answer:"D.) Values"  
    },
    {
    question:"Which of these has a value of true/false?",
    answers:["A.) Numbers", "B.) Boolean", "C.) String", "D.) Object"],
    answer:"B.) Boolean"
    }
]

var startButton = document.querySelector("#quiz-btn");
var quiz = document.querySelector("#quiz-question");
var choices = document.querySelector("#choices");
var confirmE = document.querySelector("#confirm");
var timeLeft = document.querySelector("#timer")
var resultsE = document.querySelector("#results-btn");
var intialsE = document.querySelector("#endscreen");

var currentQuestionIndex = 0;
var results= 0;

function startQuiz () {
    countDown();
    generateQuestion();
}

function generateQuestion(){

   if(currentQuestionIndex >= questions.length){
        endScreen ();
        } else {
            quiz.innerHTML="";
            choices.innerHTML="";
    
            var showQuestion = questions[currentQuestionIndex];
            var h1 = document.createElement("h1");
            h1.textContent = showQuestion.question;
            quiz.append(h1);
   
            for(var i = 0; i < showQuestion.answers.length; i++){
                var liE = document.createElement("li");
                liE.textContent = showQuestion.answers[i];
                choices.append(liE);
             }
        }
}

function checkAnswer(event){
    
    if(questions[currentQuestionIndex].answer == event.target.innerText){
        resultsE.innerHTML="";
        results++;
        var resultsEl=document.createElement("h2");
        resultsEl.textContent=results;
        confirmE.innerHTML="";
        var confirm = document.createElement("h1");
        confirm.textContent ="Correct";
        confirmE.append(confirm);
        
    } else {
        confirmE.innerHTML="";
        var confirm = document.createElement("h1");
        confirm.textContent ="Incorrect";
        confirmE.append(confirm);
        
        }
      currentQuestionIndex++;
      generateQuestion ();
}

function countDown () {
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
        if(timeLeft > 1) {
         timer.textContent = timeLeft + " seconds remaining";
         timeLeft--;
        } else if (timeLeft === 1) {
         timer.textContent = timeLeft + " seconds remaining";
         timeLeft--
        } else {
         timer.textContent = "";
          clearInterval(timeInterval);
          endScreen();
        }
       }, 1000)
     }

function endScreen () {
    quiz.innerHTML="";
    choices.innerHTML="";
    var end = document.createElement("h1");
    end.textContent="You are finished";
    intialsE.append(end);
    var initials = document.createElement("input");
    intialsE.append(initials);
    var submit=document.createElement("button");
    submit.textContent="submit initials";
    intialsE.append(submit);
}

function saveScore (event){
    if(event.target.textContent == "submit initials"){
        var score = document.querySelector("input");
        score.textContent="";
        localStorage.setItem("High Scores", JSON.stringify(`Initials: ${score.value}, Score: ${results}`));
        localStorage.getItem("High Scores", (`Initials: ${score.value}, Score: ${results}`));
        viewScore();
    }

function viewScore () {
    var results = document.createElement("h1");
    results = localStorage.getItem("High Scores", (`Initials: ${score}, Score: ${results}`));
    results.textContent=results;
    resultsE.append(results);
    }   
}



startButton.addEventListener('click', startQuiz);
choices.addEventListener("click", checkAnswer);
intialsE.addEventListener("click", saveScore);
resultsE.addEventListener("click", viewScore);