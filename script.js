$(document).ready(function() {

    /*************************************************************************************/
    //Global Variables

    /*
    * total quiz length in seconds; default is 100, test value is lower, so as not to wait 100 seconds :)
    */
    var seconds = 10;

    /*
    * tracks whether game ended with win or loss. true == win, false == loss.
    */
    var winOrLose = true; 

    /*
    * global variable, stores string question
    */
    var question = "";

    /*
    * global variable, stores string answer choice 1
    */
    var answerOne = "";

    /*
    * global variable, stores string answer choice 2
    */
    var answerTwo = "";

    /*
    * global variable, stores string answer choice 3
    */
    var answerThree = "";

    /*
    * global variable, stores string answer choice 4
    */
    var answerFour = "";


    /*************************************************************************************/
    //Listeners

    /* 
    * when start quiz button is clicked run initializeQuiz() function
    */
    $(".start-button").on("click", initializeQuiz());

    /* 
    * when user clicks on an answer choice
    * run isValid()
    * isValid() goes to next question
    */
   $(".choices").on("click", function(e){
        //run isvalid
    });


    /*************************************************************************************/
    //Functions

    /*
    * initializes the quiz when start-button is clicked
    */    
    function initializeQuiz(){

        //imports the questions to head of this file
        importQuestions();

        var intro = $("#introduction");
        var Btn = $(".start-button");
        
        var answerGroup = $(".answer-group");

        var answerBtnType = "button",
            answerBtnClasses = "btn btn-primary answer-choices";

        //builds new button template, to be added 3 times
        var newButton = $("<button>");
        newButton.attr("type", answerBtnType);
        newButton.attr("class", answerBtnClasses);

        //empty, then change attribute values to make more sense with question/answer format
        intro.empty();
        Btn.empty();
        intro.attr("id", "question");
        Btn.attr("class", answerBtnClasses);
        Btn.html("Answer 1");

        intro.html(/*Insert question here*/"???????????");

        //adds the new buttons, since we added first button by mutation of start button, only adding 3, i = 2 for ease of readability
        for(i = 2; i <= 4; i++){
            console.log("i = " + i);
            newButton.html("Answer " + i);
            newButton.clone().appendTo(answerGroup);
        }
        
        //run next question to get first question value
        nextQuestion();
        //build timer last so as not to penalize quiz-taker for javascript loading time if non-negligable
        buildTimer();
    }

    /*
    * imports questions.js
    * runs at start
    */
    function importQuestions(){
        var imported = document.createElement('questions.js');
        imported.src = 'questions.js';
        document.head.appendChild(imported);
        return imported;
    }

    /*
    * run code to show next question on screen
    */
    function nextQuestion(){
        for(i = 0; i < questions.length; i++){
            
        }
    }

    /*
    * determines validity of answer
    */
    function isValid(){
        //if correct, add time
        //if wrong, deduct time
        //mvoe to next question

    }

    /*
    * runs when game ends. 
    * @arg gameOver == true if victorious, false if not
    */
    function gameEnd(gameOver){
        if(gameOver == false){
            //lost game
            console.log("You Lost!");
        } else if (gameOver == true){
            //won game
            console.log("You Won!");
        }
    }

    /*
    *changes timer value.  
    * @arg time == int in seconds, positive for positive change, negative for negative change
    */
    function changeTime(time){
        seconds = seconds + time;
        if(seconds <= 0){
            //game over, time has run out.
            winOrLose = false;
            gameEnd(winOrLose);
            return;
        }
        $(".timer").html("Time: " + seconds);
        console.log("changed time. seconds = " + seconds);
    }

    /*
    * builds the initial state of the timber object
    */
    function buildTimer(){
        console.log("building timer");
        console.log("seconds  = " + seconds);
        
        //timer will always count every second, but if game has lost, through magic in the code, timer will not change in value.
        window.setInterval(start, 1000);
        
        /*
        * start timer. 
        */
        function start() {
            if(seconds > 0){ //if time is not yet 0
                changeTime(-1);
            } else {
                //game over, time has hit 0, this should never run due to handling in changeTime(), it is merely here just in case.
                winOrLose = false;
                gameEnd(winOrLose);
                return;
            }
        }
    }
});