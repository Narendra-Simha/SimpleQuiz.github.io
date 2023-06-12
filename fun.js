const questions=[
    {
        question: "Which is largest animal in the world?",
        answers:[
            { text:"Shark", correct: false},
            { text:"Blue Whale", correct: true},
            { text:"Lion", correct: false},
            { text:"Rhino", correct: false},
        ]
    },
    {
        question: "How many days are there in a week?",
        answers:[
            { text:"8", correct: false},
            { text:"5", correct: false},
            { text:"7", correct: true},
            { text:"9", correct: false},
        ]
    },
    {
        question: "Which of the father of Nation India?",
        answers:[
            { text:"Babasaheb Ambedkar", correct: false},
            { text:"Mahatma Gandhi", correct: true},
            { text:"Narendra Modi", correct: false},
            { text:"Jawarharlal Nehru", correct: false},
        ]
    },
    {
        question: "Which is largest country in the world?",
        answers:[
            { text:"Russia", correct: true},
            { text:"USA", correct: false},
            { text:"Australlia", correct: false},
            { text:"Canada", correct: false},
        ]
    },
    {
        question: "Which is team won FIFA 2022  world cup?",
        answers:[
            { text:"Argentina", correct: true},
            { text:"Brazil", correct: false},
            { text:"France", correct: false},
            { text:"Portugal", correct: false},
        ]
    },
    {
        question: "How many teeth does an adult human have?",
        answers:[
            { text:"21", correct: false},
            { text:"34", correct: false},
            { text:"18", correct: false},
            { text:"32", correct: true},
        ]
    },
    {
        question: "Who  discovered electric bulb?",
        answers:[
            { text:"Isaac Newton", correct: false},
            { text:"Charles Darwin", correct: false},
            { text:"Thomas Edison", correct: true},
            { text:"Albert Einstien", correct: false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();//reset previous options
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+ currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)

    });


}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}

function showScore(){
    resetState();
    //below backtick
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Attempt Quiz Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }


}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
