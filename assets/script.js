//Array of objects that include questions,choices, and answers 
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
//variables that allow functions to track where in index certain outputs will be
var startButton = document.querySelector("#quiz-btn");
var quiz = document.querySelector("#quiz-question");
var choices = document.querySelector("#choices");
var confirmE = document.querySelector("#confirm");
var timeLeft = document.querySelector("#timer")
var resultsE = document.querySelector("#results-btn");
var intialsE = document.querySelector("#endscreen");

var currentQuestionIndex = 0;
var results= "";
//when start is clicked, timer and generateQuestion function is initiated
function startQuiz () {
    countDown();
    generateQuestion();
}
//Generates question and answers from var questions
function generateQuestion(){
//Ends the generate function if all questions have been cycled through    
    if(currentQuestionIndex >= questions.length){
        endScreen ();
        } else {
            quiz.innerHTML="";
            choices.innerHTML="";
            var showQuestion = questions[currentQuestionIndex];
            var h1 = document.createElement("h1");
            h1.textContent = showQuestion.question;
            quiz.append(h1);
 //creates li element for answers  
            for(var i = 0; i < showQuestion.answers.length; i++){
                var liE = document.createElement("li");
                liE.textContent = showQuestion.answers[i];
                choices.append(liE);
             }
        }
}

function checkAnswer(event){
 //creates h1 element after user selects answer, and informs user if they are correct/incorrect, also tallies correct answers   
    if(questions[currentQuestionIndex].answer == event.target.innerText){
        results++;
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
//Allows user to answer next question by cycling through index and generating next question        
      currentQuestionIndex++;
      generateQuestion ();
}
//timer function
function countDown () {
    var timeLeft = 20;
    var timeInterval = setInterval(function () {
        if(timeLeft >= 0) {
         timer.textContent = timeLeft + " seconds remaining";
         timeLeft--;
        }}, 1000)
    }
//when timer reaches 0 or all questions have been answered, end form appears for users to submit their initials 
function endScreen () {
    quiz.innerHTML="";
    choices.innerHTML="";
    var end = document.createElement("h1");
    end.textContent="You are finished";
    intialsE.append(end);
    var initials = document.createElement("input");
    initials.setAttribute("style", "background-color: darkgoldenrod; color:black");
    intialsE.append(initials);
    var submit=document.createElement("button");
    submit.textContent="Submit Initials";
    intialsE.append(submit);
    submit.setAttribute("style", "background-color: darkgoldenrod; color: darkred");
}
//functions that allow user to save and view score
function saveScore (event){
    if(event.target.textContent == "Submit Initials"){
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
//allows user to see last score recorded
function viewHighScore () {
    function viewScore () {
        score = "";
        var results = document.createElement("h1");
        results = localStorage.getItem("High Scores", (`Initials: ${score}, Score: ${results}`));
        results.textContent=results;
        resultsE.append(results);
        }  
        viewScore();
}

//event listeners added for functions to start quiz app
startButton.addEventListener('click', startQuiz);
choices.addEventListener("click", checkAnswer);
intialsE.addEventListener("click", saveScore);
resultsE.addEventListener("click", viewHighScore);