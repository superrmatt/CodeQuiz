$(document).ready(function() {

    /*************************************************************************************/
    //Global Variables

    /*
    * total quiz length in seconds; default is 100, test value is lower, so as not to wait 100 seconds :)
    */
    var seconds = 100;

    /*
    * stores current question as string
    */
    var question = "";

    /*
    * stores all current answer choices as string[]
    */
    var answers = ["", "", "", ""];

    /*
    * stores current correct answer
    */
    var correctAnswer = "";

    /*
    * global variable which stores question number, starts at question 0, as in, index 0 on questions.
    */
    var questionNumber = 0;

    /*
    * 
    */
    var intervalFunction = null;


    /*************************************************************************************/
    //Listeners

    /*
    * When high scores button is clicked on navbar
    */
    $(document).on("click", $(".high-scores"), function(e){
        //show high scores
        //local storage stuffs
            //load
            
    });

    /*
    * When high scores button is clicked on navbar
    */
    $(document).on("click", $(".initials-btn"), function(e){
        //submit initials
        //local storage stuffs
            //get text input from $("#initials-input")
            //save to local storage

        var initials = $("#initials-input").val();
        localStorage.setItem('initials', initials);
        localStorage.setItem('score', seconds);

        var retrievedScore = localStorage.getItem('score'),
            retrievedInitials = localStorage.getItem('initials');;

        console.log("score = " + retrievedScore);
        console.log("init  = " + retrievedInitials);

    });

    /* 
    * When start quiz button is clicked, initialize quiz
    */
    $(".start-button").on("click", function(){
               
        //imports the questions to head of this file
        importQuestions();
        //gets first question value, stores in global variables
        getQuestion();
 
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
    $(document).on("click", ".answer-choices", function(e){
       
        var getValue = e.target.textContent;

        //correct answer
        if(getValue == correctAnswer){
            isValid(true);
        } 
        //wrong answer
        else if (getValue != correctAnswer){
            isValid(false);
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
    * accessor, gets current question, (title, answers, and correct answer) and stores in global variables
    */
    function getQuestion(){
        //get question, set to global
        question = questions[questionNumber].title;

        //get answers, set to global
        for(i = 0; i < questions[questionNumber].choices.length; i++){
            answers[i] = questions[questionNumber].choices[i];
        }
        
        //get correct answer, set to global
        correctAnswer = questions[questionNumber].answer;
    }

    /*
    * responds based on validity of answer, mainly to keep ".answer-button" listener a little cleaner looking
    * @arg: validity type boolean = true if answer is correct, false if not
    */
    function isValid(validity){

        //correct answer
        if(validity == true){
            if(questionNumber == questions.length - 1){
                quizEnd();
                return;
            }
            changeTime(+5);

            //append a small message, remove after 1 second
            $(".center").append("<div class=\"message\"><hr><p><i>Correct!");
            setTimeout(function() {
                $(".message").remove();
            }, 1000);

            //increment questionNumber, get the next question and set html for next question
            questionNumber += 1
            getQuestion();
            setQA();
        }

        //incorrect answer
        else if(validity == false){
            changeTime(-15);
            
            //append a small message, remove after 1 second
            $(".center").append("<div class=\"message\"><hr><p><i>Wrong!");
            setTimeout(function() {
                $(".message").remove();
            }, 1000); 
        }
    }

    /*
    * runs when quiz ends. 
    */
    function quizEnd(){
        //end timer
        clearInterval(intervalFunction);

        //build score page
        buildEndPage();
    }

    /*
    * function which builds the ending page, called at completion
    */
    function buildEndPage(){
        $(".answer-choices").remove();
        $("#question").remove();
        $(".answer-group").remove();
        $(".center").append("<div class=\"game-end\">");
        $(".game-end").append("<div id=\"end-message\"><strong>All Done!");
        $(".game-end").append("<div id=\"score\"> Your score is: " + seconds);
        $(".game-end").append("<div class=\"initials\">Enter initials: <input id=\"initials-input\"><button type=\"button\" class=\"btn btn-primary initials-btn\">Submit")
    }

    /*
    * changes timer value.  
    * @arg time == int delta in seconds
    * delta being change
    */
    function changeTime(delta){
        seconds = seconds + delta;
        if(seconds <= 0){
            //game over, time has run out.
            quizEnd();
            return;
        }
        $(".timer").html("Time: " + seconds);
    }

    /*
    * builds the initial state of the timer
    */
    function buildTimer(){
        
        //timer will always count every second
        intervalFunction = window.setInterval(start, 1000);

        /*
        * starts & runs timer. 
        */
        function start() {
            if(seconds > 0){ //if time is not yet 0
                changeTime(-1);
                //decrement
            } else { //else
                //time has hit 0, this should never run due to handling in changeTime(), it is merely here just in case.
                quizEnd();
                return;
            }
        }
    }

    /*
    * mutator: sets question & answer in html
    * generally, to be called upon correct answer
    * for this functionality to work properly (as intended), run getQuestions() first, to update current question
    */
    function setQA(){
        //edit question html
        $("#question").html(question);

        //edit button html
        for(i = 0; i < 4; i ++){
            $("#" + i).html(answers[i])
        }
    }

    /*
    * mutator: sets the high score values
    * @arg: initials, type string, stores initials
    * @arg: score, type int, stores score value
    */
    function setHighScore(initials, score){
        //set local storage baed on args
    }

    /*
    * accessor: get high score as stores in local storage
    * @arg: initials, stores string value of user in question
    */
    function getHighScore(initials){
        //read local storage to get values
    }
});