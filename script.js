$(document).ready(function() {

    /*************************************************************************************/
    //Global Variables

    /*
    * total quiz length in seconds; default is 100, test value is lower, so as not to wait 100 seconds :)
    */
    var seconds = 150;

    /*
    * tracks whether game ended with win or loss. true == win, false == loss.
    */
    var winOrLose = true; 

    /*
    * global variable, stores string question
    */
    var question = "";

    /*
    * global variable, stores all answers as strings
    */
    var answers = ["", "", "", ""];

    /*
    * global variable which stores correct question
    */
    var correctAnswer = "";

    /*
    * global variable which stores question number, starts at question 0, as in, index 0 on questions.
    */
    var questionNumber = 0;

    /*
    * boolean, tracks whether quiz started
    */
    var started = false;


    /*************************************************************************************/
    //Listeners


    /* 
    * when start quiz button is clicked, initialize quiz
    */
   $(document).on("click", $(".start-button"), function(e){

        //both events are being fired at button click. I think because JS is reading the original and changed attribute values, my current solution is to have this checker at start of each listener, but it doenst work
        if(started == true){
            return;
        }
        //imports the questions to head of this file
        importQuestions();
        //run getQuestion() to get first question value
        getQuestion();

        started = true;
 
        var intro = $("#introduction");
 
        $(".start-button").remove();
         
        var answerGroup = $(".answer-group");
 
        var answerBtnType = "button",
            answerBtnClasses = "btn btn-primary answer-choices";
 
        //builds new button template, to be added 3 times
        var newButton = $("<button>");
        newButton.attr("type", answerBtnType);
        newButton.attr("class", answerBtnClasses);
 
        //empty, then change attribute values to make more sense with question/answer format
        intro.empty();
        intro.attr("id", "question");
        intro.html(question);
 
        //adds the new buttons
        for(i = 0; i < 4; i++){
            newButton.html(answers[i]);
            newButton.attr("id", i);
            newButton.clone().appendTo(answerGroup);
        }
         
        //build timer last so as not to penalize quiz-taker for javascript loading time if non-negligable
        buildTimer();
    });


    /* 
    * when user clicks on an answer choice
    * validate & respond accordingly.
    */
   $(document).on("click", $(".answer-choices"), function(e){
        //both events are being fired at button click. I think because JS is reading the original and chnaged attribute values, my current solution is to have this checker at start of each listener
        if(started == false){
            return;
        }

        var getValue = e.target.textContent;

        //correct answer
        if(getValue == correctAnswer){
            isValid(true);
            console.log("correct");
        } 
        //wrong answer
        else if (getValue != correctAnswer){
            isValid(false);
            console.log("incorrect");
        }
    });


    /*************************************************************************************/
    //Functions


    /*
    * imports questions.js
    * runs at start
    */
    function importQuestions(){
        var imported = document.createElement('questions');
        imported.src = 'questions.js';
        document.head.appendChild(imported);
        return imported;
    }


    /*
    * accessor, gets current question and associated values (answers and such)
    */
    function getQuestion(){
        //get question
        question = questions[questionNumber].title;

        //gets answers
        for(i = 0; i < questions[questionNumber].choices.length; i++){
            answers[i] = questions[questionNumber].choices[i];
        }
        
        //gets correct answer
        correctAnswer = questions[questionNumber].answer;
    }


    /*
    * responds based on validity of answer, mainly to keep listener a little cleaner looking
    * @arg: validity type boolean = true if answer is correct, false if not
    */
    function isValid(validity){
        //increment question #
        //run get question
        //change html to reflect new questions

        //correct answer
        if(validity == true){
            changeTime(+5);
            questionNumber += 1
            getQuestion();
            setQA();
        }
        //incorrect answer
        else if(validity == false){
            changeTime(-5);
        }
    }


    /*
    * runs when game ends. 
    * @arg gameOver == true if victorious, false if not
    */
    function gameEnd(gameOver){
        //show score screen.
        // create add high score button -> run associated function
        if(gameOver == false){
            //lost game
            //changes time to 0
            $(".timer").html("Time: 0");
            console.log("You Lost!");
        } else if (gameOver == true){
            //won game
            console.log("You Won!");
        }
    }


    /*
    * changes timer value.  
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
    }


    /*
    * builds the initial state of the timber object
    */
    function buildTimer(){
        
        //timer will always count every second, but if game has lost, and it has been recorded, timer will not change in value.
        window.setInterval(start, 1000);
        

        /*
        * starts timer. 
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

    /*
    * mutator: sets question & answer
    * generally, to be called at correct answer
    * for this functionality to work properly (as intended), run getQuestions() first, to update current question
    */
    function setQA(){
        //edit question html
        console.log(question);
        $("#question").html(question);

        //edit button html
        for(i = 0; i < 4; i ++){
            $("#" + i).html(answers[i])
        }
    }
});