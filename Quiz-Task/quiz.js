
let quizData = [
{
question:"JavaScript is used for?",
options:["Styling","Web Programming","Database","Hardware"],
answer:"Web Programming"
},
{
question:"Which symbol is comment?",
options:["//","##","<>","**"],
answer:"//"
},
{
question:"Which keyword creates variable?",
options:["var","int","float","char"],
answer:"var"
},
{
question:"Which method prints output?",
options:["print()","console.log()","show()","write()"],
answer:"console.log()"
},
{
question:"DOM means?",
options:["Data Object Method","Document Object Model","Digital Object Model","None"],
answer:"Document Object Model"
},
{
question:"Strict equality operator?",
options:["=","==","===","!="],
answer:"==="
},
{
question:"Which loop repeats condition?",
options:["while","switch","if","case"],
answer:"while"
},
{
question:"JavaScript is _____ language",
options:["Programming","Database","Markup","Design"],
answer:"Programming"
},
{
question:"Which event for click?",
options:["onclick","onhover","onchange","onload"],
answer:"onclick"
},
{
question:"Array stores?",
options:["Single value","Multiple values","Only number","Only text"],
answer:"Multiple values"
}
];


let currentQuestion = 0;
let userAnswers = new Array(quizData.length);


let welcome = document.getElementById("welcome");
let quiz = document.getElementById("quiz");
let result = document.getElementById("result");

let question = document.getElementById("question");
let options = document.getElementById("options");
let progress = document.getElementById("progress");

let startBtn = document.getElementById("startBtn");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");
let restartBtn = document.getElementById("restartBtn");


startBtn.addEventListener("click", function(){
    welcome.classList.add("hide");
    quiz.classList.remove("hide");
    loadQuestion();
});


function loadQuestion(){

    let q = quizData[currentQuestion];

    question.innerHTML = q.question;
    options.innerHTML = "";

    for(let i=0; i<q.options.length; i++){

        let div = document.createElement("div");
        div.innerHTML = q.options[i];
        div.classList.add("option");

       
        if(userAnswers[currentQuestion] == q.options[i]){
            div.classList.add("selected");
        }

        div.addEventListener("click", function(){

            userAnswers[currentQuestion] = q.options[i];

            let all = document.querySelectorAll(".option");
            all.forEach(function(item){
                item.classList.remove("selected");
            });

            div.classList.add("selected");
        });

        options.appendChild(div);
    }

    progress.innerHTML =
    "Question " + (currentQuestion+1) + " of " + quizData.length;


    prevBtn.disabled = currentQuestion==0;

    if(currentQuestion==quizData.length-1){
        nextBtn.classList.add("hide");
        submitBtn.classList.remove("hide");
    }else{
        nextBtn.classList.remove("hide");
        submitBtn.classList.add("hide");
    }
}

nextBtn.addEventListener("click", function(){
    if(currentQuestion < quizData.length-1){
        currentQuestion++;
        loadQuestion();
    }
});

prevBtn.addEventListener("click", function(){
    if(currentQuestion > 0){
        currentQuestion--;
        loadQuestion();
    }
});

submitBtn.addEventListener("click", function(){

    let score = 0;

    for(let i=0; i<quizData.length; i++){
        if(userAnswers[i] == quizData[i].answer){
            score++;
        }
    }

    let wrong = quizData.length - score;
    let percentage = (score/quizData.length)*100;

    quiz.classList.add("hide");
    result.classList.remove("hide");

    document.getElementById("total").innerHTML = quizData.length;
    document.getElementById("correct").innerHTML = score;
    document.getElementById("wrong").innerHTML = wrong;
    document.getElementById("percent").innerHTML = percentage;

    let msg = "";

    if(percentage >= 80){
        msg = "Excellent!";
    }
    else if(percentage >=60){
        msg = "Great Job!";
    }
    else if(percentage >=40){
        msg = "Good Effort!";
    }
    else{
        msg = "Keep Practicing!";
    }

    document.getElementById("message").innerHTML = msg;
});

restartBtn.addEventListener("click", function(){

    currentQuestion = 0;
    userAnswers = new Array(quizData.length);

    result.classList.add("hide");
    welcome.classList.remove("hide");
});